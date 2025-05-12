import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import UIConstants from "@/constants/Values";
import { Image } from "expo-image";
import { BadgeCheck, Edit, Search, Users, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock data for conversations
const CONVERSATIONS = [
  {
    id: "1",
    name: "Ahmed Hassan",
    avatar:
      "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
    lastMessage: "Let's meet at the coffee shop tomorrow",
    time: "2m",
    unread: 2,
    isVerified: true,
    isOnline: true,
  },
  {
    id: "2",
    name: "Sara Ahmed",
    avatar:
      "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
    lastMessage: "Thanks for the help with the project!",
    time: "15m",
    unread: 0,
    isVerified: false,
    isOnline: true,
  },
  {
    id: "3",
    name: "Kawa Mustafa",
    avatar:
      "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
    lastMessage: "Did you see the new update?",
    time: "2h",
    unread: 1,
    isVerified: false,
    isOnline: false,
  },
  {
    id: "4",
    name: "Layla Ibrahim",
    avatar:
      "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
    lastMessage: "I'll send you the files by tomorrow",
    time: "3h",
    unread: 0,
    isVerified: true,
    isOnline: false,
  },
  {
    id: "5",
    name: "Omar Khalid",
    avatar:
      "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
    lastMessage: "Looking forward to your feedback",
    time: "5h",
    unread: 0,
    isVerified: false,
    isOnline: true,
  },
  {
    id: "6",
    name: "Zara Mohammed",
    avatar:
      "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
    lastMessage: "Check out this new design I created",
    time: "1d",
    unread: 3,
    isVerified: false,
    isOnline: false,
  },
  {
    id: "7",
    name: "Dilshad Khalil",
    avatar:
      "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
    lastMessage: "Great work on the project!",
    time: "1d",
    unread: 0,
    isVerified: true,
    isOnline: true,
  },
  {
    id: "8",
    name: "Mariam Ali",
    avatar:
      "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
    lastMessage: "Can we reschedule our meeting?",
    time: "2d",
    unread: 0,
    isVerified: false,
    isOnline: false,
  },
];

// Header component
const MessagesHeader = () => {
  return (
    <HStack className="p-4 border-b border-gray-100 justify-between items-center">
      <Text className="text-2xl font-SF_Bold">Messages</Text>
      <HStack space="md">
        <TouchableOpacity
          activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
          className="p-2 rounded-full bg-gray-50"
        >
          <Users size={22} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
          className="p-2 rounded-full bg-gray-50"
        >
          <Edit size={22} color="black" />
        </TouchableOpacity>
      </HStack>
    </HStack>
  );
};

// Search component
const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <HStack className="px-4 py-3 items-center bg-gray-50 mx-4 rounded-full mb-4">
      <Search size={20} color="#8E8E8E" />
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search messages"
        placeholderTextColor="#8E8E8E"
        className="flex-1 ml-2 text-base font-SF_Regular"
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity
          activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
          onPress={() => setSearchQuery("")}
        >
          <X size={18} color="#8E8E8E" />
        </TouchableOpacity>
      )}
    </HStack>
  );
};

// Message item component
const MessageItem = ({ conversation }) => {
  return (
    <TouchableOpacity
      activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
      className="px-4 py-3"
      // onPress={() => router.push(`/chat/${conversation.id}`)}
    >
      <HStack space="md" className="items-center">
        <Box className="relative">
          <Image
            source={{ uri: conversation.avatar }}
            contentFit="cover"
            style={styles.avatar}
          />
          {conversation.isOnline && <View style={styles.onlineIndicator} />}
        </Box>

        <VStack space="xs" className="flex-1">
          <HStack className="justify-between items-center">
            <HStack space="xs" className="items-center">
              <Text
                className={`font-SF_Bold text-base ${
                  conversation.unread > 0 ? "text-black" : "text-gray-800"
                }`}
              >
                {conversation.name}
              </Text>
              {conversation.isVerified && <BadgeCheck size={16} color="blue" />}
            </HStack>
            <Text
              className={`text-xs ${
                conversation.unread > 0
                  ? "text-blue-500 font-SF_Bold"
                  : "text-gray-500 font-SF_Regular"
              }`}
            >
              {conversation.time}
            </Text>
          </HStack>

          <HStack className="justify-between items-center">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className={`text-sm ${
                conversation.unread > 0
                  ? "text-black font-SF_Medium"
                  : "text-gray-500 font-SF_Regular"
              }`}
              style={{ maxWidth: "85%" }}
            >
              {conversation.lastMessage}
            </Text>
            {conversation.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{conversation.unread}</Text>
              </View>
            )}
          </HStack>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};

// Main Messages screen
const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = CONVERSATIONS.filter((convo) =>
    convo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <MessagesHeader />
      <Box className="flex-1">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <FlatList
          data={filteredConversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageItem conversation={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 8 }}
        />
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#34D399",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  unreadText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: "SF_Bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#F2F2F2",
    marginLeft: 74,
  },
});

export default Messages;
