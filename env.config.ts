const ENV = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL!,
};

if (!ENV.apiUrl) {
  throw new Error("API URL is not defined in the environment variables");
}

export default ENV;
