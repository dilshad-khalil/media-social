import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import UIConstants from "@/constants/Values";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ArrowLeft, BadgeCheck, Heart, Send } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

// Fake comment data
const COMMENTS = [
  {
    id: "1",
    username: "ahmed_hassan",
    isVerified: true,
    avatar:
      "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
    comment:
      "This is amazing! 🔥 Really love the work you've been putting out lately.",
    timeAgo: "2h",
    likes: 453,
    isLiked: true,
    replies: 12,
  },
  {
    id: "2",
    username: "sara_ahmed",
    isVerified: false,
    avatar:
      "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
    comment: "Always inspiring content! Keep it up ✨",
    timeAgo: "4h",
    likes: 221,
    isLiked: false,
    replies: 3,
  },
  {
    id: "3",
    username: "kawa_mustafa",
    isVerified: false,
    avatar:
      "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
    comment: "Can you share some tips on how you achieved this result?",
    timeAgo: "8h",
    likes: 98,
    isLiked: false,
    replies: 5,
  },
  {
    id: "4",
    username: "layla_ibrahim",
    isVerified: true,
    avatar:
      "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
    comment:
      "This reminds me of our project last summer! Miss working with you.",
    timeAgo: "10h",
    likes: 176,
    isLiked: false,
    replies: 2,
  },
  {
    id: "5",
    username: "omar_khalid",
    isVerified: false,
    avatar:
      "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
    comment: "Absolutely brilliant work! The details are incredible.",
    timeAgo: "12h",
    likes: 304,
    isLiked: true,
    replies: 8,
  },
  {
    id: "6",
    username: "zara_mohammed",
    isVerified: false,
    avatar:
      "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
    comment: "Been following your work for a while, this is your best yet!",
    timeAgo: "1d",
    likes: 167,
    isLiked: false,
    replies: 1,
  },
  {
    id: "7",
    username: "dilshad_khalil",
    isVerified: true,
    avatar:
      "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
    comment: "Thanks everyone for the support! More coming soon! ❤️",
    timeAgo: "1d",
    likes: 895,
    isLiked: false,
    replies: 47,
  },
  {
    id: "8",
    username: "mariam_ali",
    isVerified: false,
    avatar:
      "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
    comment: "This is exactly what I needed to see today! So inspiring.",
    timeAgo: "2d",
    likes: 78,
    isLiked: false,
    replies: 0,
  },
  {
    id: "9",
    username: "ahmad_kareem",
    isVerified: false,
    avatar:
      "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
    comment: "Honestly, you've outdone yourself this time. Incredible work!",
    timeAgo: "2d",
    likes: 115,
    isLiked: true,
    replies: 1,
  },
  {
    id: "10",
    username: "sarah_najm",
    isVerified: false,
    avatar:
      "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
    comment: "I've been trying to do something similar. Any tips?",
    timeAgo: "3d",
    likes: 43,
    isLiked: false,
    replies: 2,
  },
];

// Header Component
const CommentsHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <HStack className="items-center justify-between px-4">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-SF_Bold">Comments</Text>
        <TouchableOpacity activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}>
          <Send size={22} color="#000" />
        </TouchableOpacity>
      </HStack>
    </View>
  );
};

// Comment Item Component
interface Comment {
  id: string;
  username: string;
  isVerified: boolean;
  avatar: string;
  comment: string;
  timeAgo: string;
  likes: number;
  isLiked: boolean;
  replies: number;
}

const CommentItem = ({ comment }: { comment: Comment }) => {
  const [liked, setLiked] = useState(comment.isLiked);
  const [likesCount, setLikesCount] = useState(comment.likes);

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <HStack className="py-3 px-4" space="md">
      <TouchableOpacity
        activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
        onPress={() => router.push("/user-profile/profile")}
      >
        <Image
          source={{ uri: comment.avatar }}
          alt="Avatar"
          contentFit="cover"
          style={styles.avatar}
        />
      </TouchableOpacity>

      <VStack space="xs" className="flex-1">
        <HStack className="items-start justify-between">
          <VStack space="xs" className="flex-1">
            <HStack className="items-center" space="xs">
              <Text className="font-SF_Bold text-base">{comment.username}</Text>
              {comment.isVerified && <BadgeCheck size={14} color="blue" />}
              <Text className="text-gray-500 text-xs font-SF_Regular">
                • {comment.timeAgo}
              </Text>
            </HStack>

            <Text className="text-base font-SF_Regular">{comment.comment}</Text>

            <HStack className="items-center" space="lg">
              <Text className="text-gray-500 text-xs font-SF_Medium">
                {comment.replies > 0
                  ? `View ${comment.replies} ${
                      comment.replies === 1 ? "reply" : "replies"
                    }`
                  : ""}
              </Text>
              <TouchableOpacity
                activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
                onPress={() => {}}
              >
                <Text className="text-gray-500 text-xs font-SF_Medium">
                  Reply
                </Text>
              </TouchableOpacity>
            </HStack>
          </VStack>

          <TouchableOpacity
            onPress={handleLike}
            activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
            style={styles.likeButton}
          >
            <Heart
              size={14}
              color={liked ? "#ED4956" : "#888"}
              fill={liked ? "#ED4956" : "transparent"}
            />
            {likesCount > 0 && (
              <Text className="text-xs font-SF_Medium text-gray-500 mt-1">
                {likesCount}
              </Text>
            )}
          </TouchableOpacity>
        </HStack>
      </VStack>
    </HStack>
  );
};

// Comment Input Component
const CommentInput = () => {
  const [comment, setComment] = useState("");
  const inputRef = useRef(null);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.inputContainer,
        { paddingBottom: Math.max(insets.bottom, 12) },
      ]}
    >
      <HStack className="items-center px-4 py-2" space="md">
        <Image
          source={{
            uri: "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
          }}
          alt="Avatar"
          contentFit="cover"
          style={styles.inputAvatar}
        />

        <TextInput
          ref={inputRef}
          value={comment}
          onChangeText={setComment}
          placeholder="Add a comment as dilshad_khalil..."
          placeholderTextColor="#8E8E8E"
          className="flex-1 text-base font-SF_Regular"
          style={styles.textInput}
          multiline
        />

        <TouchableOpacity
          activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
          disabled={!comment.trim()}
          style={{ opacity: comment.trim() ? 1 : 0.5 }}
          onPress={() => {
            // Handle posting comment
            setComment("");
            Keyboard.dismiss();
          }}
        >
          <Text className="text-blue-500 font-SF_Bold text-base">Post</Text>
        </TouchableOpacity>
      </HStack>
    </View>
  );
};

// Main Comments Screen
const CommentsScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[styles.container, { paddingTop: 0 }]}
      edges={["left", "right"]}
    >
      <CommentsHeader />

      <FlatList
        data={COMMENTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CommentItem comment={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 100 }}
      />

      <CommentInput />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    height: 56,
    borderBottomWidth: 0.5,
    marginTop: 16,
    borderBottomColor: "#DBDBDB",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  inputAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  likeButton: {
    alignItems: "center",
    paddingHorizontal: 8,
    marginLeft: 6,
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0.5,
    borderTopColor: "#DBDBDB",
    backgroundColor: "#FFFFFF",
  },
  textInput: {
    maxHeight: 100,
  },
  separator: {
    height: 1,
    backgroundColor: "#F2F2F2",
  },
});

export default CommentsScreen;
