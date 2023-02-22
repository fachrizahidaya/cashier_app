import React from "react";
import FooterComp from "../components/FooterComp";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Card,
  CardHeader,
  Heading,
  Text,
  CardBody,
  Image,
  CardFooter,
  SimpleGrid,
  Center,
  Divider,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/userSlice";
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
