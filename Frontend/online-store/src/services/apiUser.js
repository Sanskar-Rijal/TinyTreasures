import { BASE_URL, LOGIN_USER } from "../utils/Constants";

export async function LoginUser({ email, password }) {
  const response = await fetch(`${BASE_URL}${LOGIN_USER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", //save cookies
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw  new Error(err.message || "Login Failed, Please try again later");
  }
  const data = await response.json();
  return data;
}
