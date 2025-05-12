import { Redirect } from "expo-router";
import { useState } from "react";

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Redirect to home if authenticated
  if (isAuthenticated) return <Redirect href="/home" />;

  // Show login page initially (could be register too)
  return <Redirect href="/(auth)/login" />;
}
