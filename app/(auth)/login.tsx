import login from "@/api/login";
import { Spinner } from "@/components/ui/spinner";
import { setAccessToken } from "@/utils/access-token";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.token) {
        setAccessToken(data.token);
        router.replace("/home");
      } else {
        alert("Invalid credentials");
      }
    },
    onError: (error) => {
      console.log(error);
      alert("Invalid credentials");
    },
  });

  const handleLogin = () => {
    if (email || password) {
      mutation.mutate({ email, password });
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
      {mutation.isPending ? (
        <Spinner />
      ) : (
        <TouchableOpacity
          className="bg-black rounded-xl p-4"
          onPress={handleLogin}
        >
          <Text className="text-white text-center text-base font-semibold">
            Login
          </Text>
        </TouchableOpacity>
      )}
      <Pressable onPress={() => router.replace("/register")} className="mt-6">
        <Text className="text-center text-gray-600">
          {`Don't have an account?`}{" "}
          <Text className="text-black">Register</Text>
        </Text>
      </Pressable>
    </View>
  );
}
