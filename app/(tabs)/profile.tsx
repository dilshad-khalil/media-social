import { getProfile } from "@/api/profile";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { BadgeCheck } from "lucide-react-native";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Profile Header Component
const ProfileHeader = () => {
  const queryProfile = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
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
            <ProfileStat count="120" label="posts" />
            <ProfileStat count="2.1M" label="followers" />
            <ProfileStat count="122" label="following" />
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

const PostRow = ({ images }: { images: string[] }) => {
  return (
    <HStack space="sm" className="mb-2">
      {images.map((image, index) => (
        <PostImage key={index} uri={image} />
      ))}
    </HStack>
  );
};

const PostImage = ({ uri }: { uri: string }) => {
  return (
    <Box className="flex-1 bg-black h-[120px] rounded-lg">
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

const generatePostData = () => {
  return Array.from({ length: 3 }).map((_, i) => ({
    id: `row-${i}`,
    images: [
      `https://picsum.photos/300/300?random=${i * 3}`,
      `https://picsum.photos/400/400?random=${i * 4 + 1}`,
      `https://picsum.photos/500/500?random=${i * 3 + 2}`,
    ],
  }));
};

// Main Component
const UserProfile = ({ hasHeader = true }: { hasHeader: boolean }) => {
  const postData = generatePostData();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <FlatList
        data={postData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostRow images={item.images} />}
        ListHeaderComponent={<ProfileHeader />}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: hasHeader ? 56 + insets.top : insets.top }, // Add header height + top inset
        ]}
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
