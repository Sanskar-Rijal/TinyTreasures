const getProducts = async (req, res) => {
  res.status(200).json({
    status: "true",
    message: "Products fetched successfully",
  });
};

const deleteProduct = async (req, res) => {
  res.status(200).json({
    status: "true",
    message: "Products fetched successfully",
  });
};

export { getProducts, deleteProduct };
