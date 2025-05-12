import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import UIConstants from "@/constants/Values";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { ArrowLeft, BadgeCheck, ChevronDown } from "lucide-react-native";
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
          className="p-2 rounded-full border border-gray-200"
        >
          <ArrowLeft size={20} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-SF_Bold text-black">{title}</Text>
      </HStack>
    </View>
  );
};

// Profile Header Component
const ProfileHeader = () => {
  return (
    <Box className="w-full h-auto bg-white rounded-lg p-3 mb-4">
      <VStack space="md">
        <HStack className="w-full items-center">
          <Box className="h-auto w-auto border-2 border-blue-500 p-1 rounded-full">
            <Image
              style={{
                width: 72,
                height: 72,
                borderRadius: 9999,
              }}
              contentFit="cover"
              source={{
                uri: "https://t3.ftcdn.net/jpg/02/75/47/42/360_F_275474265_nkDhz0m7eJ5Ux6OErd1DanxyPPoYv5CZ.jpg",
              }}
            />
          </Box>
          <HStack className="flex-1 px-10 justify-between">
            <ProfileStat count="120" label="posts" />
            <ProfileStat count="2.1M" label="followers" />
            <ProfileStat count="122" label="following" />
          </HStack>
        </HStack>

        <HStack space="sm" className="items-center">
          <Text className="text-xl font-SF_Bold">Dilshad Khalil</Text>
          <BadgeCheck color={"blue"} size={18} />
        </HStack>

        <ProfileBio />
        <ProfileActions />
      </VStack>
    </Box>
  );
};

const ProfileStat = ({ count, label }: { count: string; label: string }) => {
  return (
    <VStack className="items-center">
      <Text className="text-black font-SF_Bold text-xl">{count}</Text>
      <Text className="text-gray-500 font-SF_Medium">{label}</Text>
    </VStack>
  );
};

const ProfileBio = () => {
  return (
    <HStack className="flex-col">
      <Text className="font-SF_Medium text-lg text-gray-600">🎸 Musician</Text>
      <Text className="font-SF_Medium text-lg text-gray-600">
        🎹 &quot;Too Much Of A Good Thing&quot; OUT NOW
      </Text>
    </HStack>
  );
};

const ProfileActions = () => {
  return (
    <HStack space="sm" className="w-full justify-between items-center">
      <TouchableOpacity
        activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
        className="border border-gray-100 rounded-full items-center gap-2 flex-1 flex-row p-3 justify-center"
      >
        <Text className="text-lg font-SF_Medium">Following</Text>
        <ChevronDown size={16} color={"black"} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
        className="border border-gray-100 rounded-full items-center flex-1 gap-2 flex-row p-3 justify-center"
      >
        <Text className="text-lg font-SF_Medium">Message</Text>
      </TouchableOpacity>
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
      {hasHeader && <PageHeader title="Profile" />}
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
