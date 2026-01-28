import { BASE_URL, INITIATE_PAYMENT, VERIFY_PAYMENT } from "../utils/Constants";

//function to initiate khalti payment
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

//function to verify khalti payment
export async function verifyKhaltiPayment(paymentData) {
  const response = await fetch(`${BASE_URL}${VERIFY_PAYMENT}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });
  if (!response.ok) {
    throw Error("Failed to verify Khalti payment");
  }
  const data = await response.json();
  return data;
}
