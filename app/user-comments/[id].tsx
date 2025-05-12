import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import UIConstants from "@/constants/Values";
import { getComments } from "@/features/posts/api/comment";
import { Comment } from "@/features/posts/type";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Heart, Send } from "lucide-react-native";
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

const CommentItem = ({ data }: { data: Comment }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <HStack className="px-4 py-3" space="md">
      <TouchableOpacity
        activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
        onPress={() => router.push("/user-profile/profile")}
      >
        <Image
          source={{
            uri:
              data.profile_picture ??
              "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          alt="Avatar"
          contentFit="cover"
          style={styles.avatar}
        />
      </TouchableOpacity>

      <VStack space="xs" className="flex-1">
        <HStack className="items-start justify-between">
          <VStack space="xs" className="flex-1">
            <HStack className="items-center" space="xs">
              <Text className="text-base font-SF_Bold">{data.username}</Text>
              {/* {true && <BadgeCheck size={14} color="blue" />} */}
              {/* <Text className="text-xs text-gray-500 font-SF_Regular">
                • {}
              </Text> */}
            </HStack>

            <Text className="text-base font-SF_Regular">{data.content}</Text>

            <HStack className="items-center" space="lg">
              {/* <Text className="text-xs text-gray-500 font-SF_Medium">
                {comment.replies > 0
                  ? `View ${comment.replies} ${
                      comment.replies === 1 ? "reply" : "replies"
                    }`
                  : ""}
              </Text> */}
              <TouchableOpacity
                activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
                onPress={() => {}}
              >
                <Text className="text-xs text-gray-500 font-SF_Medium">
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
              <Text className="mt-1 text-xs text-gray-500 font-SF_Medium">
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
          <Text className="text-base text-blue-500 font-SF_Bold">Post</Text>
        </TouchableOpacity>
      </HStack>
    </View>
  );
};

// Main Comments Screen
const CommentsScreen = () => {
  const { id }: { id: string } = useLocalSearchParams();

  console.log("l", id);

  const commentsQuery = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComments(id),
  });

  const data = commentsQuery.data?.data ?? [];

  return (
    <SafeAreaView
      style={[styles.container, { paddingTop: 0 }]}
      edges={["left", "right"]}
    >
      <CommentsHeader />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CommentItem data={item} />}
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
