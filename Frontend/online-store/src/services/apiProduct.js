import { BASE_URL, GET_PRODUCTS } from "../utils/Constants";


//getting all products
export async function getAllProducts({ category }) {
  let url = GET_PRODUCTS;
  if (category) {
    url += `?category=${category}`;
  }
  const response = await fetch(`${BASE_URL}${url}`);
  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually.
  //  This will then go into the catch block, where the message is set
  if (!response.ok)
    throw Error("Failed to Fetch Products, Please try again later ");
  const data = await response.json();
  return data;
}
