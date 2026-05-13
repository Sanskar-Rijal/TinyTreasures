import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import mongoose from "mongoose";
import dotenv from "dotenv";
import storeInfo from "./storeInfo.js";

dotenv.config({ path: "../config.env" });

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function flattenProduct(product) {
  return `
    Product Name: ${product.name}.
    Category: ${product.category}.
    Price: Rs ${product.price}.
    Stock: ${product.stock} units available.
    Rating: ${product.ratingsAverage} out of 5 (${product.ratingsQuantity} reviews).
    Description: ${product.description}.
  `.trim();
}

//helper function to avoid rate limit
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

//we have 4 steps here
//1)Read data from json file
//2)Generate embeddings for each item in the data
//3)Connect to mongoose
//4)Insert all documents in bulk
async function generateAndStoreEmbeddings() {
  try {
    //1) connecting to our DataBase
    const DB = process.env.DATABASE.replace(
      "<PASSWORD>",
      process.env.DATABASE_PASSWORD,
    );
    await mongoose
      .connect(DB)
      .then(() => {
        console.log(
          "DB connection successful, now generating and storing embeddings...",
        );
      })
      .catch((err) => {
        console.log(
          "Erorr connecting to the database during seed process",
          err,
        );
      });

    //2)Read product.json file
    const fileData = fs.readFileSync("product.json", "utf-8");
    const productArray = JSON.parse(fileData);

    const documents = [];
    // 3) Generate embeddings for each product
    /* eslint-disable no-await-in-loop */
    // eslint-disable-next-line no-restricted-syntax
    for (const pro of productArray) {
      const textChunk = flattenProduct(pro);

      const response = await gemini.models.embedContent({
        model: "gemini-embedding-001",
        contents: [textChunk],
      });

      console.log("Embedding Response:", response.embeddings);
      const embedding = response.embeddings[0].values;

      documents.push({
        type: "product",
        text: textChunk,
        embedding,
        productId: pro._id.$oid,
        productName: pro.name,
        category: pro.category,
        price: pro.price,
        image: pro.images[0]?.url,
      });
      await sleep(500); // avoid rate limit
    }

    //4) Generate embeddings for storeInfo (FAQ, terms, etc.)
    /* eslint-disable no-await-in-loop */
    // eslint-disable-next-line no-restricted-syntax
    for (const info of storeInfo) {
      const response = await gemini.models.embedContent({
        model: "gemini-embedding-001",
        contents: [info.text],
      });
      const embedding = response.embeddings[0].values;
      documents.push({
        text: info.text,
        embedding,
        type: info.type,
        question: info.question || null,
      });

      console.log(`📘 Embedded faq Info: ${info.type}`);
      await sleep(500);
    }
    //5) Insert all  documents in bulk to mongodb
    const { db } = mongoose.connection;
    const collection = db.collection("product_embeddings");
    await collection.deleteMany({}); // clear old

    if (documents.length > 0) {
      console.log(`Inserting ${documents}`);
      await collection.insertMany(documents);
      console.log(`Inserted ${documents.length} embeddings into MongoDB.`);
    }

    console.log(`🎉 Inserted ${documents.length} total embeddings!`);
  } catch (error) {
    console.error("Seed error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

generateAndStoreEmbeddings();
