import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("shafa@gmail.com");
  const [password, setPassword] = useState("shafa1234");

  const handleLogin = () => {
    if (email === "shafa@gmail.com" && password === "shafa1234") {
      router.replace("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <View className="flex-1 justify-center bg-white px-6">
      <Text className="text-3xl font-bold mb-6 text-black">Welcome Back</Text>
      <TextInput
        className="bg-gray-100 text-black p-4 mb-4 rounded-xl"
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        className="bg-gray-100 text-black p-4 mb-6 rounded-xl"
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Pressable className="bg-black rounded-xl p-4" onPress={handleLogin}>
        <Text className="text-white text-center text-base font-semibold">
          Login
        </Text>
      </Pressable>
      <Pressable onPress={() => router.replace("/register")} className="mt-6">
        <Text className="text-center text-gray-600">
          Don't have an account? <Text className="text-black">Register</Text>
        </Text>
      </Pressable>
    </View>
  );
}
