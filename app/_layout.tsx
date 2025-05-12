import useLoadFonts from "@/hooks/useLoadFonts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import "../global.css";

const queryClient = new QueryClient();

const Layout = () => {
  const [fontsLoaded, error] = useLoadFonts();

  useEffect(() => {
    if (error) console.error("Error loading fonts:", error);
    if (fontsLoaded) {
      console.log("Fonts loaded successfully");
    }
  }, [error, fontsLoaded]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen
            name="stories/user-story"
            options={{
              headerShown: false,
              presentation: "containedModal",
              animation: "slide_from_bottom",
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="user-profile/profile"
            options={{
              headerShown: false,
              animation: "slide_from_right",
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="user-comments/comments"
            options={{
              headerShown: false,
              presentation: "modal",
              animation: "slide_from_bottom",
              gestureEnabled: true,
            }}
          />
        </Stack>

        <StatusBar style="dark" />
      </QueryClientProvider>
    </>
  );
};

export default Layout;
