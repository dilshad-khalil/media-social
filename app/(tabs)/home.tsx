import { VStack } from "@/components/ui/vstack";
import Description from "@/features/posts/components/description";
import UserPostHeader from "@/features/posts/components/header";
import LikedByUsers from "@/features/posts/components/liked-by";
import PostImage from "@/features/posts/components/post-image";
import ShareDrawer from "@/features/posts/components/share-drawer";
import PostsTabs from "@/features/posts/components/tabs";
import InteractionsButtons from "@/features/posts/components/wrapper";
import useQueryPostsFromFollowing from "@/features/posts/hooks/query-posts-from-following";
import { Post } from "@/features/posts/type";
import Stories from "@/features/stories/components/stories";
import React, { memo, useCallback, useRef, useState } from "react";
import { FlatList, LogBox, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Silence warning about virtualized lists - remove in production
LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

const Home = () => {
  const [isShareDrawerVisible, setIsShareDrawerVisible] = useState(false);
  const [selectedPostIdForShare, setSelectedPostIdForShare] = useState(null);
  const flatListRef = useRef(null);
  const [layoutReady, setLayoutReady] = useState(false);

  const { data: rawData, ...query } = useQueryPostsFromFollowing();
  const data = rawData?.data ?? [];

  if (query.isError) console.log(query.error.message);

  const handleOpenShareDrawer = useCallback((postId: any) => {
    setSelectedPostIdForShare(postId);
    setIsShareDrawerVisible(true);
  }, []);

  const handleCloseShareDrawer = useCallback(() => {
    setIsShareDrawerVisible(false);
    setSelectedPostIdForShare(null);
  }, []);

  const handleSendSharedItem = useCallback(
    (friendId: string) => {
      console.log(
        `Post ${selectedPostIdForShare} shared with friend: ${friendId}`
      );
      handleCloseShareDrawer();
    },
    [selectedPostIdForShare, handleCloseShareDrawer]
  );

  // // Force layout recalculation after initial render
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLayoutReady(true);
  //     if (flatListRef.current) {
  //       flatListRef.current.scrollToOffset({ offset: 0, animated: false });
  //     }
  //   }, 50);
  //   return () => clearTimeout(timer);
  // }, []);

  const renderPostItem = useCallback(
    ({ item }: { item: Post }) => <Posts post={item} />,
    [handleOpenShareDrawer]
  );

  const ListHeaderMemo = memo(() => (
    <View>
      <Stories />
      <PostsTabs />
    </View>
  ));

  ListHeaderMemo.displayName = "ListHeaderMemo";

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPostItem}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={3}
        removeClippedSubviews={Platform.OS === "android"}
        ListHeaderComponent={<ListHeaderMemo />}
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
        // onLayout={() => {
        //   // Force a re-render on initial layout
        //   if (flatListRef.current && !layoutReady) {
        //     setTimeout(() => {
        //       if (flatListRef.current) {
        //         flatListRef.current.scrollToOffset({
        //           offset: 0,
        //           animated: false,
        //         });
        //       }
        //     }, 100);
        //   }
        // }}
        // Key by layout ready to force re-render when layout is ready
        key={layoutReady ? "layout-ready" : "layout-preparing"}
        // Do not use getItemLayout - it can cause issues on iOS
      />
      <ShareDrawer
        isVisible={isShareDrawerVisible}
        onClose={handleCloseShareDrawer}
        onSend={handleSendSharedItem}
        // postId={selectedPostIdForShare}
      />
    </SafeAreaView>
  );
};

interface PostsProps {
  post: Post;
}

const Posts = memo(({ post }: PostsProps) => {
  return (
    <VStack
      key={post.id}
      className="w-full px-4 py-3 bg-white border-b border-gray-100"
      space="md"
      style={styles.postContainer}
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
    backgroundColor: "#F3F4F6", // bg-gray-100
  },
  listContentContainer: {
    paddingBottom: 80, // Adjust for TabBar height
  },
  postContainer: {
    // Explicitly set these properties to ensure consistent layout
    overflow: "hidden",
    alignSelf: "stretch",
    width: "100%",
  },
});

export default Home;
