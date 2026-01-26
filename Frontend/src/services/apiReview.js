import { ADD_NEW_REVIEW, BASE_URL } from "../utils/Constants";

export async function addNewReview(reviewData) {
  const response = await fetch(`${BASE_URL}${ADD_NEW_REVIEW}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
    credentials: "include",
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(
      err.message || "Failed to add review, Please try again later",
    );
  }
  const data = await response.json();
  return data;
}
