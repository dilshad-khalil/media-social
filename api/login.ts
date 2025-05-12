import AxiosInstance from "@/axios.config";

type Response = {
  user: {
    id: string;
    email: string;
    username: string;
  };
  token: string;
};

/**
 * This function handles user login by sending a POST request to the server with the user's email and password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<any>} - A promise that resolves to the response data from the server.
 */
export default async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  console.log("one");

  const response = await AxiosInstance.post<Response>("/auth/login", {
    email,
    password,
  });

  console.log("two");
  return response.data;
}
