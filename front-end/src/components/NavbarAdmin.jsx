import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../redux/adminSlice";
import { CategoryComp } from "./CategoryComp";
import { ItemComp } from "./ItemComp";
import { RegisterComp } from "./RegisterComp";

export default function NavbarAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.adminSlice.value);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem("tokenAdmin");
    navigate("/admin");
  };

  const NavLink = ({ children }) => (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Link>
  );

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex>
            <Image
              src="https://cdn-icons-png.flaticon.com/512/2734/2734227.png"
              w={"35px"}
            ></Image>
          </Flex>
          <HStack spacing={"20px"}>
            <Text>Product</Text>
            <Text>Category</Text>
          </HStack>

          <Flex alignItems={"center"}>
            <HStack spacing={"20px"}>
              <Menu>
                <ItemComp />
                <CategoryComp />
              </Menu>
            </HStack>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{username}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <RegisterComp />
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
