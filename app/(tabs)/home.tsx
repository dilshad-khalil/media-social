import { VStack } from "@/components/ui/vstack";
import Description from "@/features/posts/components/description";
import UserPostHeader from "@/features/posts/components/header"; // Ensure correct path
import LikedByUsers from "@/features/posts/components/liked-by"; // Ensure correct path
import PostImage from "@/features/posts/components/post-image"; // Ensure correct path
import ShareDrawer from "@/features/posts/components/share-drawer";
import PostsTabs from "@/features/posts/components/tabs"; // Ensure correct path
import InteractionsButtons from "@/features/posts/components/wrapper"; // Ensure correct path
import Stories from "@/features/stories/components/stories"; // Ensure correct path
import React, { memo, useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define dummy post type for the example if not already defined
interface PostItem {
  id: string;
  // other post properties
}

const Home = () => {
  const [isShareDrawerVisible, setIsShareDrawerVisible] = useState(false);
  // Use useCallback for functions passed to memoized components or event handlers
  const handleOpenShareDrawer = useCallback(
    (/*postId: string*/) => {
      // setSelectedPostIdForShare(postId); // Store post ID if needed for the onSend action
      setIsShareDrawerVisible(true);
    },
    []
  );

  const handleCloseShareDrawer = useCallback(() => {
    setIsShareDrawerVisible(false);
    // setSelectedPostIdForShare(null);
  }, []);

  const handleSendSharedItem = useCallback(
    (friendId: string) => {
      console.log(`Post shared with friend: ${friendId}`); // Add post ID if stored: Post ${selectedPostIdForShare} shared...
      // Here you would typically call an API to share the post
      // Optionally, close the drawer or show a "Sent" confirmation within the drawer
    },
    [
      /*selectedPostIdForShare*/
    ]
  );

  const renderPostItem = useCallback(
    ({ item }: { item: PostItem }) => (
      <Posts
        post={item} // Pass post data if needed by Posts component
        onSharePress={() => handleOpenShareDrawer(/*item.id*/)}
      />
    ),
    [handleOpenShareDrawer]
  );

  // Dummy data for FlatList
  const DUMMY_POST_DATA: PostItem[] = Array.from({ length: 10 }, (_, i) => ({
    id: (i + 1).toString(),
  }));

  return (
    // Use edges prop to control SafeAreaView behavior if TabBar is absolutely positioned
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <FlatList
        data={DUMMY_POST_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderPostItem}
        ListHeaderComponent={
          <View className="h-auto">
            <Stories />
            <PostsTabs />
          </View>
        }
        className="bg-white flex-1" // bg-white for the list area
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer} // Adjusted padding for absolute TabBar
      />
      <ShareDrawer
        isVisible={isShareDrawerVisible}
        onClose={handleCloseShareDrawer}
        onSend={handleSendSharedItem}
      />
    </SafeAreaView>
  );
};

// Make sure Posts component accepts onSharePress
interface PostsProps {
  post: PostItem; // Example: if Posts needs post data
  onSharePress: () => void;
}

const Posts = memo(({ post, onSharePress }: PostsProps) => {
  return (
    <VStack
      // Consider adding a key here if post.id is available: key={post.id}
      className="h-auto flex-1 px-4 py-3 bg-white border-b border-gray-100" // Adjusted styling slightly for consistency
      space="md"
    >
      <UserPostHeader />
      <PostImage />
      <LikedByUsers />
      <InteractionsButtons onSharePress={onSharePress} />
      <Description />
    </VStack>
  );
});

Posts.displayName = "Posts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6", // bg-gray-100 or your app's main background
  },
  listContentContainer: {
    paddingBottom: 80, // Adjust this based on your actual TabBar height
  },
});

export default Home;
