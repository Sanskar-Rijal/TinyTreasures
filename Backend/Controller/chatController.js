import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import getCollection from "../utils/RagDb.js";

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

//we have to embedded the query from user with same embedding model
async function embeddedQuery(query) {
  const response = await gemini.models.embedContent({
    model: "gemini-embedding-001",
    contents: [query],
  });

  const embeddings = response.embeddings[0].values;
  return embeddings || [];
}

//Build Aggregation Pipeline
function buildAggregationPipeline(queryVector) {
  return [
    {
      $vectorSearch: {
        queryVector,
        path: "embedding",
        numCandidates: 20,
        limit: 5,
        index: "vector_index_products", // must match your Atlas index name
      },
    },
    {
      $project: {
        text: 1,
        type: 1,
        productName: 1,
        price: 1,
        image: 1,
        question: 1,
        score: { $meta: "vectorSearchScore" },
      },
    },
  ];
}

const askQuestion = catchAsync(async (req, res, next) => {
  const { question } = req.body;

  if (!question) {
    return next(new AppError("Please provide a question", 400));
  }
  try {
    //R-Retrival
    //1)Embedded the query
    const queryEmbedding = await embeddedQuery(question);
    //2)Search most relevant documents from our vector database based on the query
    const collection = await getCollection("product_embeddings");
    const pipeline = buildAggregationPipeline(queryEmbedding);
    const results = await collection.aggregate(pipeline).toArray();

    if (results.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "Sorry, I couldn't find relevant information.",
      });
    }

    //A-Augmentation
    //3)Combine top results into context
    const context = results
      .map((item) => {
        if (item.type === "product") {
          return `PRODUCT:
        Name: ${item.productName}
        Price: Rs ${item.price}
        Details: ${item.text}`;
        }
        return `INFO (${item.type}):
        ${item.text}`;
      })
      .join("\n\n");

    //4)Send to our LLM to get the answer

    const chatResponse = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: `
          You are a friendly shopping assistant named April for the TinyTreasures shopping website.
  YOUR BEHAVIOR:
- Use the provided context to answer the user’s question.
- If the question is about store policy, answer using store_info.
- If the question is about products, answer using product data.
- Always mention prices in Rs (Nepalese currency).
- Keep your tone warm, playful, and friendly.
- Add fun bracket comments at the end of your answers. These comments should feel like personal suggestions or playful thoughts. Example:
  - “(If I were you, I’d totally grab this one for a cute TikTok video hehe)”
  - “(Don’t worry, our team will accept your refund request, you’re too sweet 😘)”
  - “(Khalti uses purple and I love purple, so I approve only khalti payements 🤪)”

FORMATTING RULES:
- Do not use bold, headings, or formatting for products, suggestions, or explanations, you may use brackets.
- You must NOT use any formatting when writing your answers.
- Do NOT write answers using bold or headings. Example of correct intro: “Hi, I’m **April!** ”`,
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion: ${question}`,
        },
      ],
    });
    const answer = chatResponse.choices[0].message.content;
    res.status(200).json({
      status: "success",
      message: answer,
    });
  } catch (error) {
    return next(
      new AppError(error.message || "Error processing the question", 500),
    );
  }
});

export default askQuestion;
