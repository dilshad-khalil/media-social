import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import UIConstants from "@/constants/Values";
import { Image } from "expo-image";
import { Search, X } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Friend {
  id: string;
  username: string;
  avatar: string;
  name: string; // Real name or display name
}

// Mock data for friends - in a real app, this would come from an API
const MOCK_FRIENDS: Friend[] = [
  {
    id: "1",
    username: "john_doe",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?u=john_doe1",
  },
  {
    id: "2",
    username: "jane_smith",
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?u=jane_smith2",
  },
  {
    id: "3",
    username: "mike_jones",
    name: "Mike Jones",
    avatar: "https://i.pravatar.cc/150?u=mike_jones3",
  },
  {
    id: "4",
    username: "sarah_k",
    name: "Sarah Karl",
    avatar: "https://i.pravatar.cc/150?u=sarah_k4",
  },
  {
    id: "5",
    username: "chris_lee",
    name: "Chris Lee",
    avatar: "https://i.pravatar.cc/150?u=chris_lee5",
  },
  {
    id: "6",
    username: "emily_w",
    name: "Emily Wang",
    avatar: "https://i.pravatar.cc/150?u=emily_w6",
  },
  {
    id: "7",
    username: "david_b",
    name: "David Brown",
    avatar: "https://i.pravatar.cc/150?u=david_b7",
  },
  {
    id: "8",
    username: "another_user",
    name: "Another Person",
    avatar: "https://i.pravatar.cc/150?u=another_user8",
  },
  {
    id: "9",
    username: "test_user_9",
    name: "Test Nine",
    avatar: "https://i.pravatar.cc/150?u=test_user_9",
  },
  {
    id: "10",
    username: "friend_ten",
    name: "Friendly Ten",
    avatar: "https://i.pravatar.cc/150?u=friend_ten10",
  },
];

interface ShareDrawerProps {
  isVisible: boolean;
  onClose: () => void;
  // onSend?: (friendId: string, postId: string) => void; // If you need post context
  onSend?: (friendId: string) => void;
}

const FriendListItem = ({
  friend,
  onSend,
}: {
  friend: Friend;
  onSend?: (friendId: string) => void;
}) => {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (sending || sent) return;
    setSending(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSending(false);
    setSent(true);
    onSend?.(friend.id);

    // Optionally revert "Sent" state after a while for demo purposes
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <HStack className="px-4 py-3 items-center justify-between">
      <HStack className="items-center flex-1" space="md">
        <Image
          source={{ uri: friend.avatar }}
          style={styles.avatar}
          contentFit="cover"
        />
        <VStack className="flex-1">
          {" "}
          {/* Ensure VStack takes available space to prevent text truncation issues */}
          <Text className="text-base font-SF_Bold text-black" numberOfLines={1}>
            {friend.username}
          </Text>
          <Text
            className="text-sm text-gray-500 font-SF_Regular"
            numberOfLines={1}
          >
            {friend.name}
          </Text>
        </VStack>
      </HStack>
      <TouchableOpacity
        onPress={handleSend}
        disabled={sending || sent}
        activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
        className={`py-2 px-5 rounded-full min-w-[80px] items-center justify-center ${
          sent ? "bg-gray-200" : sending ? "bg-blue-300" : "bg-blue-500"
        }`}
      >
        {sending ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text
            className={`font-SF_Medium ${
              sent ? "text-gray-600" : "text-white"
            }`}
          >
            {sent ? "Sent" : "Send"}
          </Text>
        )}
      </TouchableOpacity>
    </HStack>
  );
};

const ShareDrawer: React.FC<ShareDrawerProps> = ({
  isVisible,
  onClose,
  onSend,
}) => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");

  const filteredFriends = useMemo(
    () =>
      MOCK_FRIENDS.filter(
        (friend) =>
          friend.username.toLowerCase().includes(searchText.toLowerCase()) ||
          friend.name.toLowerCase().includes(searchText.toLowerCase())
      ),
    [searchText]
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalOverlay}
      >
        {/* Backdrop to close modal on tap - optional */}
        <TouchableOpacity
          style={styles.modalBackdrop}
          onPress={onClose}
          activeOpacity={1}
        />
        <VStack
          style={[
            styles.drawerContainer,
            { paddingBottom: insets.bottom > 0 ? insets.bottom : 16 },
          ]}
        >
          {/* Header */}
          <HStack className="p-4 items-center justify-between border-b border-gray-200">
            <View style={{ width: 28 }} />{" "}
            {/* Spacer to balance the X button */}
            <Text className="text-lg font-SF_Bold text-black">Send to</Text>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
              className="p-1"
            >
              <X size={24} color="black" />
            </TouchableOpacity>
          </HStack>

          {/* Search Bar */}
          <HStack className="p-4 items-center space-x-3 border-b border-gray-200">
            <HStack className="flex-1 bg-gray-100 rounded-lg items-center px-3 h-10">
              <Search size={18} color="#8E8E8E" style={{ marginRight: 8 }} />
              <TextInput
                placeholder="Search"
                placeholderTextColor="#8E8E8E"
                value={searchText}
                onChangeText={setSearchText}
                className="flex-1 h-full font-SF_Regular text-base text-black"
                autoCorrect={false}
              />
            </HStack>
          </HStack>

          {/* Friends List */}
          <FlatList
            data={filteredFriends}
            renderItem={({ item }) => (
              <FriendListItem friend={item} onSend={onSend} />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingTop: 8 }} // flexGrow allows empty component to center
            ListEmptyComponent={
              <VStack className="flex-1 items-center justify-center p-5">
                <Text className="font-SF_Medium text-gray-500 text-base text-center">
                  {searchText
                    ? `No results for "${searchText}"`
                    : "Search for friends to share with."}
                </Text>
              </VStack>
            }
          />
        </VStack>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen behind the modal content
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  drawerContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "85%", // Percentage of screen height
    minHeight: "40%",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});

export default ShareDrawer;
