import {
  BASE_URL,
  INITIATE_PAYMENT,
  My_ORDERS,
  VERIFY_PAYMENT,
} from "../utils/Constants";

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

//get my orders
export async function getMyOrders() {
  const response = await fetch(`${BASE_URL}${My_ORDERS}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    const err = await response.json();
    throw Error(err.message || "Failed to fetch order details");
  }
  const data = await response.json();
  return data;
}
