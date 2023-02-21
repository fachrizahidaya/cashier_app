import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { loginAdmin } from "../redux/adminSlice";

const url = `http://localhost:2000/admin/login`;

export default function AdminLandingPage() {
  // const {username} = useSelector((state) => state.adminSlice.value);
  // const tokenLocalStorage = localStorage.getItem("tokenAdmin");
  const dispatch = useDispatch();
  const inputUsername = useRef("");
  const inputPass = useRef("");
  const navigate = useNavigate();

  const onLogin = async () => {
    try {
      const admin = {
        username: inputUsername.current.value,
        password: inputPass.current.value,
      };
      const result = await Axios.post(url, admin);
      dispatch(
        loginAdmin({
          username: result.data.isUserExist.username,
        })
      );
      localStorage.setItem("tokenAdmin", result.data.token);
      navigate("/adminHome");
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Admin Page</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to Home Page <Link color={"blue.400"}>click here</Link>
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Username</FormLabel>
              <Input type="text" ref={inputUsername} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" ref={inputPass} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={onLogin}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
