import Product from "../Models/product.js";

//get all products
const getProducts = async (req, res) => {

  const products = await Product.find();

  res.status(200).json({
    status: "true",
    message: products,
  });
};


const deleteProduct = async (req, res) => {
  res.status(200).json({
    status: "true",
    message: "Products fetched successfully",
  });
};

//create new Products
const createNewProduct = async (req, res) => {
  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: "true",
    messaeg: newProduct,
  });
};

//find products by id 
const getProductById = async(req,res)=>{
  const product = await Product.findById(req.params.id);

  res.status(200).json({
    status:"true",
    message:product
  })
}

export { getProducts, deleteProduct, createNewProduct,getProductById };
