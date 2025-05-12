import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Register() {
  const [email, setEmail] = useState("ahmedazad@gmail.com");
  const [password, setPassword] = useState("ahmed1234");
  const [username, setUsername] = useState("ahmedazad");

  const handleRegister = () => {
    if (email && password && username) {
      router.replace("/home");
    } else {
      alert("All fields required");
    }
  };

  return (
    <View className="flex-1 justify-center bg-white px-6">
      <Text className="text-3xl font-bold mb-6 text-black">Create Account</Text>
      <TextInput
        className="bg-gray-100 text-black p-4 mb-4 rounded-xl"
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />
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
      <Pressable className="bg-black rounded-xl p-4" onPress={handleRegister}>
        <Text className="text-white text-center text-base font-semibold">
          Register
        </Text>
      </Pressable>
      <Pressable onPress={() => router.replace("/login")} className="mt-6">
        <Text className="text-center text-gray-600">
          Already have an account? <Text className="text-black">Login</Text>
        </Text>
      </Pressable>
    </View>
  );
}
