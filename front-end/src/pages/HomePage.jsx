import React from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { NavbarUser } from "../components/NavbarUser";
import { CategorySidebar } from "../components/CategorySidebar";
import { TransactionSidebar } from "../components/TransactionSidebar";
import { MenuUser } from "../components/MenuComp";

export const HomePage = () => {
  return (
    <div>
      <NavbarUser />
      <Flex justifyContent={"space-around"}>
        <Box
          pos={"static"}
          rounded={"sm"}
          my={5}
          h="fit-content"
          mx={[0, 5]}
          overflow={"hidden"}
          bg="white"
          // border={"1px"}
          borderColor="black"
          boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
        >
          <CategorySidebar />
        </Box>

        <Box
          w={"685px"}
          rounded={"sm"}
          my={5}
          mx={[0, 5]}
          overflow={"hidden"}
          bg="white"
          // border={"1px"}
          borderColor="black"
          boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
        >
          <MenuUser />
        </Box>

        <Box
          w={"300px"}
          rounded={"sm"}
          my={5}
          mx={[0, 5]}
          overflow={"hidden"}
          h="fit-content"
          bg="white"
          // border={"1px"}
          borderColor="black"
          boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
        >
          <TransactionSidebar />
        </Box>
      </Flex>
    </div>
  );
};
