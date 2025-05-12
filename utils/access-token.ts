import * as SecureStore from "expo-secure-store";

export function setAccessToken(token: string) {
  SecureStore.setItem("accessToken", token);
}

export function getAccessToken() {
  return SecureStore.getItem("accessToken");
}
