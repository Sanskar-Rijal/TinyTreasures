import {
  BASE_URL,
  FIND_PRODUCTS_BY_ID,
  GET_PRODUCTS,
} from "../utils/Constants";

//getting all products
export async function getAllProducts({ category, page, limit }) {
  let url = `${BASE_URL}${GET_PRODUCTS}?page=${page}&limit=${limit}`;
  if (category && category !== "All") {
    url += `&category=${category}`;
  }
  const response = await fetch(url);
  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually.
  //  This will then go into the catch block, where the message is set
  if (!response.ok)
    throw Error("Failed to Fetch Products, Please try again later ");
  const data = await response.json();
  return data;
}

//get product by id
export async function getProductbyId(id) {
  let url = FIND_PRODUCTS_BY_ID + `/${id}`;

  const response = await fetch(`${BASE_URL}${url}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const err = await response.json();
    throw Error(err.message || "Failed to fetch product details");
  }
  const data = await response.json();
  return data;
}
