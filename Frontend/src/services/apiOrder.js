import { BASE_URL, INITIATE_PAYMENT } from "../utils/Constants";

export async function initiateKhaltiPayment(orderData) {
  const response = await fetch(`${BASE_URL}${INITIATE_PAYMENT}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    throw Error("Failed to initiate Khalti payment");
  }
  const data = await response.json();
  return data;
}
