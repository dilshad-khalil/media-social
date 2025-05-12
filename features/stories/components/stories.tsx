import { Box } from "@/components/ui/box";
import UIConstants from "@/constants/Values";
import names from "@/utils/dummy-data";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
const Stories = () => {
  // Create array of 10 items for stories
  const stories = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    name: names[Math.floor(Math.random() * names.length)],
    image: "https://picsum.photos/300/300",
  }));

  return (
    <FlatList
      data={stories}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ padding: 6 }}
      ItemSeparatorComponent={() => <Box className="w-2" />}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => router.push("/stories/user-story")}
          activeOpacity={UIConstants.DEFAULT_ACTIVE_OPACITY}
          className="items-center h-auto flex-col gap-1"
        >
          <Box className="size-[68px] rounded-full border border-blue-400 p-1">
            <Image
              source={{ uri: item.image }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 100,
              }}
              className="size-full bg-gray-200 rounded-full"
              contentFit="cover"
            />
          </Box>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default Stories;
