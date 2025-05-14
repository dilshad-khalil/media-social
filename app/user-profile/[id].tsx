import { followUser, unfollowUser } from "@/api/follow";
import { getPostByAuthor } from "@/api/posts";
import { getProfile } from "@/api/profile";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import UIConstants from "@/constants/Values";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { ArrowLeft, BadgeCheck } from "lucide-react-native";
import React, { useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Page Header (Fixed)
const PageHeader = ({ title }: { title: string }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View
      style={[
        styles.headerContainer,
        { height: 56 + insets.top, paddingTop: insets.top },
      ]}
    >
      <HStack className="items-center gap-2 px-4">
        <TouchableOpacity
          onPress={handleGoBack}
          activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
          className="p-2 border border-gray-200 rounded-full"
        >
          <ArrowLeft size={20} color="black" />
        </TouchableOpacity>
        <Text className="text-xl text-black font-SF_Bold">{title}</Text>
      </HStack>
    </View>
  );
};

// Profile Header Component
const ProfileHeader = () => {
  const { id } = useLocalSearchParams();

  const queryProfile = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfile(id as string),
  });

  const data = queryProfile?.data?.data;

  return (
    <Box className="w-full h-auto p-3 mb-4 bg-white rounded-lg">
      <VStack space="md">
        <HStack className="items-center w-full">
          <Box className="w-auto h-auto p-1 border-2 border-blue-500 rounded-full">
            <Image
              style={{
                width: 72,
                height: 72,
                borderRadius: 9999,
              }}
              contentFit="cover"
              source={{
                uri: data?.profile_picture,
              }}
            />
          </Box>
          <HStack className="justify-between flex-1 px-10">
            <ProfileStat
              count={data?.postsCount.toString() || ""}
              label="posts"
            />
            <ProfileStat
              count={data?.followersCount.toString() || ""}
              label="followers"
            />
            <ProfileStat
              count={data?.followingCount.toString() || ""}
              label="following"
            />
          </HStack>
        </HStack>

        <VStack>
          <HStack space="sm" className="items-center">
            <Text className="text-xl font-SF_Bold">{data?.display_name}</Text>
            <BadgeCheck color={"blue"} size={18} />
          </HStack>
          <Text className="text-lg font-SF_Semibold">@{data?.username}</Text>
        </VStack>

        <ProfileBio text={data?.bio ?? ""} />
        <ProfileActions />
      </VStack>
    </Box>
  );
};

const ProfileStat = ({ count, label }: { count: string; label: string }) => {
  return (
    <VStack className="items-center">
      <Text className="text-xl text-black font-SF_Bold">{count}</Text>
      <Text className="text-gray-500 font-SF_Medium">{label}</Text>
    </VStack>
  );
};

const ProfileBio = ({ text }: { text: string }) => {
  return (
    <HStack className="flex-col">
      <Text className="text-lg text-gray-600 font-SF_Medium">{text}</Text>
    </HStack>
  );
};

const ProfileActions = () => {
  const { id } = useLocalSearchParams();

  const queryProfile = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfile(id as string),
  });

  const data = queryProfile?.data?.data;
  const isFollowing = data?.isFollowing;

  const followMutation = useMutation({
    mutationFn: () => followUser(id as string),
    onSuccess: () => queryProfile.refetch(),
    onError: (error) => console.log(error),
  });

  const unfollowMutation = useMutation({
    mutationFn: () => unfollowUser(id as string),
    onSuccess: () => queryProfile.refetch(),
    onError: (error) => console.log(error),
  });

  const isLoading = followMutation.isPending || unfollowMutation.isPending;

  const handleFollowToggle = () => {
    if (isFollowing) {
      unfollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };

  return (
    <HStack space="sm" className="items-center justify-between w-full">
      <TouchableOpacity
        disabled={isLoading}
        onPress={handleFollowToggle}
        activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
        className={`flex-row items-center justify-center flex-1 gap-2 p-3 rounded-full border 
          ${
            isFollowing
              ? "bg-gray-100 border-gray-200"
              : "bg-black border-black"
          }
        `}
      >
        <Text
          className={`text-lg font-SF_Medium ${
            isFollowing ? "text-black" : "text-white"
          }`}
        >
          {isLoading ? "Loading..." : isFollowing ? "Following" : "Follow"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
        className="flex-row items-center justify-center flex-1 gap-2 p-3 border border-gray-100 rounded-full"
      >
        <Text className="text-lg font-SF_Medium">Message</Text>
      </TouchableOpacity>
    </HStack>
  );
};

const PostImage = ({ uri }: { uri: string }) => {
  return (
    <Box className="flex-1 bg-black h-[120px] aspect-square mx-1 rounded-lg">
      <Image
        source={{ uri }}
        cachePolicy={"memory-disk"}
        alt="PostImage"
        contentFit="cover"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 8,
        }}
      />
    </Box>
  );
};

// Main Component
const UserProfile = () => {
  const insets = useSafeAreaInsets();

  const { id } = useLocalSearchParams();

  const queryProfile = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfile(id as string),
  });

  const userId =
    queryProfile?.data?.data.id ?? "47d8c9ce-ead1-4855-b2d5-1f6823138715";
  const queryPosts = useQuery({
    queryKey: ["posts", "author", userId],
    queryFn: () => getPostByAuthor(userId),
  });
  const posts = queryPosts.data?.data ?? [];

  return (
    <View style={styles.container}>
      <PageHeader title="Profile" />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostImage uri={item.PostImage || ""} />}
        numColumns={3}
        ListHeaderComponent={<ProfileHeader />}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: 56 + insets.top },
        ]}
        columnWrapperStyle={{
          marginBottom: 8,
          marginHorizontal: -8,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    zIndex: 10,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  contentContainer: {
    padding: 16,
  },
});
