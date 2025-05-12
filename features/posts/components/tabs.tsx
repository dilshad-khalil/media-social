import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import React from "react";
import { Text } from "react-native";

const PostsTabs = () => {
  return (
    <HStack space="sm" className="bg-white py-2 min-h-max px-2 flex flex-col">
      <HStack space="sm" className="">
        <Center className="px-6 py-[10px]  bg-blue-600  rounded-full">
          <Text className=" text-lg text-white font-SF_Medium">My Feed</Text>
        </Center>
        <Center className="px-6 py-[10px] rounded-full bg-gray-50 text-gray-400 border border-gray-100 font-SF_Medium">
          <Text>Live</Text>
        </Center>
        <Center className="px-6 py-[10px] rounded-full bg-gray-50 text-gray-400 border border-gray-100 font-SF_Medium">
          <Text>Friends</Text>
        </Center>
        <Center className="px-6 py-[10px] rounded-full bg-gray-50 text-gray-400 border border-gray-100 font-SF_Medium">
          <Text>Explore</Text>
        </Center>
      </HStack>
    </HStack>
  );
};

export default PostsTabs;
