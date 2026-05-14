import { ASK_QUESTION, BASE_URL } from "../utils/Constants";

export async function askQuestion(questionData) {
  const response = await fetch(`${BASE_URL}${ASK_QUESTION}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(questionData),
    credentials: "include",
  });
  if (!response.ok) {
    const err = await response.json();
    throw Error(
      err.message || "April is having trouble answering your questions.",
    );
  }
  const data = await response.json();
  return data;
}
