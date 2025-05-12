import { VStack } from "@/components/ui/vstack";
import Description from "@/features/posts/components/description";
import UserPostHeader from "@/features/posts/components/header"; // Ensure correct path
import LikedByUsers from "@/features/posts/components/liked-by"; // Ensure correct path
import PostImage from "@/features/posts/components/post-image"; // Ensure correct path
import ShareDrawer from "@/features/posts/components/share-drawer";
import PostsTabs from "@/features/posts/components/tabs";
import InteractionsButtons from "@/features/posts/components/wrapper"; // Ensure correct path
import useQueryPostsFromFollowing from "@/features/posts/hooks/query-posts-from-following";
import { Post } from "@/features/posts/type";
import Stories from "@/features/stories/components/stories";
import React, { memo, useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [isShareDrawerVisible, setIsShareDrawerVisible] = useState(false);

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
  const { data: rawData, ...query } = useQueryPostsFromFollowing();
  const data = rawData?.data ?? [];

  if (query.isError) console.log(query.error.message);

  const renderPostItem = useCallback(
    ({ item }: { item: Post }) => (
      <Posts
        key={item.id} // Ensure each post has a unique key
        post={item} // Pass post data if needed by Posts component
      />
    ),
    []
  );

  return (
    // Use edges prop to control SafeAreaView behavior if TabBar is absolutely positioned
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <FlatList
        data={data ?? []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPostItem}
        getItemLayout={(data, index) => ({
          length: 600, // estimated height of a post
          offset: 500 * index,
          index,
        })}
        initialNumToRender={5}
        ListHeaderComponent={
          <View>
            <Stories />
            <PostsTabs />
          </View>
        }
        className="flex-1 bg-white" // bg-white for the list area
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
  post: Post; // Example: if Posts needs post data
}

const Posts = memo(({ post }: PostsProps) => {
  return (
    <VStack
      // Consider adding a key here if post.id is available: key={post.id}
      key={post.id}
      className="flex-1 px-4 py-3 bg-white border-b border-gray-100" // Adjusted styling slightly for consistency
      space="md"
    >
      <UserPostHeader post={post} />
      <PostImage data={post} />
      <LikedByUsers />
      <InteractionsButtons data={post} />
      <Description data={post} />
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
