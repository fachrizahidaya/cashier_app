import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { ListComp } from "../components/ListComp";
import { ListSidebar } from "../components/ListSidebar";
import { MenuUser } from "../components/MenuComp";
import { NavbarUser } from "../components/NavbarUser";

export const TransactionList = () => {
  return (
    <div>
      <NavbarUser />
      <Flex justifyContent={"space-evenly"}>
        <Box
          pos={"static"}
          rounded={"sm"}
          my={5}
          h="fit-content"
          mx={[0, 5]}
          overflow={"hidden"}
          bg="white"
        //   border={"1px"}
          borderColor="black"
          boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
        >
          <ListSidebar />
        </Box>

        <Box
          w={"685px"}
          rounded={"sm"}
          my={5}
          mx={[0, 5]}
          overflow={"hidden"}
          bg="white"
        //   border={"1px"}
          borderColor="black"
          boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
        >
          <ListComp />
        </Box>
      </Flex>
    </div>
  );
};
