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
import FooterComp from "../components/FooterComp";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/userSlice";
import Swal from "sweetalert2";
const url = `http://localhost:2000/user/login`;

export const CashierLanding = () => {
  const { username } = useSelector((state) => state.userSlice.value);
  const tokenLocalStorage = localStorage.getItem("tokenUser");
  const dispatch = useDispatch();
  const inputUsername = useRef("");
  const inputPass = useRef("");
  const navigate = useNavigate();

  const onLogin = async () => {
    try {
      const user = {
        username: inputUsername.current.value,
        password: inputPass.current.value,
      };
      const result = await Axios.post(url, user);
      dispatch(
        loginUser({
          id: result.data.isUserExist.id,
          username: result.data.isUserExist.username,
        })
      );
      localStorage.setItem("tokenUser", result.data.token);
      navigate("/home");
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "User Not Found or Password Incorrect",
      });
      console.log(err);
    }
  };

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Welcome</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              please login to your account
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
                  {/* <Checkbox>Remember me</Checkbox> */}
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
      <FooterComp />
    </>
  );
};
