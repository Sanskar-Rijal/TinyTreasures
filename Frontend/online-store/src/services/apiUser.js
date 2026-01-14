import {
  BASE_URL,
  GET_MY_DETAILS,
  LOGIN_USER,
  LOGOUT_USER,
  RESITER_USER,
  UPDATE_PASSWORD,
  UPDATE_PROFILE,
} from "../utils/Constants";

//Register user
export async function registerUser({ name, email, password }) {
  const response = await fetch(`${BASE_URL}${RESITER_USER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(
      err.message || "Registration Failed, Please try again later",
    );
  }
  const data = await response.json();
  return data;
}

//Login user
export async function loginUser({ email, password }) {
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
    throw new Error(err.message || "Login Failed, Please try again later");
  }
  const data = await response.json();
  return data;
}

//Logout User
export async function logoutUser() {
  const response = await fetch(`${BASE_URL}${LOGOUT_USER}`, {
    method: "POST",
    credentials: "include", //send cookies
  });
  if (!response.ok) {
    throw new Error("Logout Failed, Please try again later");
  }
  const data = await response.json();
  return data;
}

//get my details
export async function getMyDetails() {
  const response = await fetch(`${BASE_URL}${GET_MY_DETAILS}`, {
    method: "GET",
    credentials: "include", //send cookies
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }
  const data = await response.json();
  return data;
}

//update user details
export async function updateProfile(details) {
  const response = await fetch(`${BASE_URL}${UPDATE_PROFILE}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(details),
  });
  if (!response.ok) {
    throw new Error("Failed to udate profile");
  }
  const data = await response.json();
  return data;
}

//update user password
export async function updatePassword(passwords) {
  const response = await fetch(`${BASE_URL}${UPDATE_PASSWORD}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(passwords),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update password");
  }
  const data = await response.json();
  return data;
}
