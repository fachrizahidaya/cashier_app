import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useRef } from "react";

export const UpdateCategory = ({ data }) => {
  const inputName = useRef("");

  const update = async (id) => {
    try {
      const data = {
        name: inputName.current.value,
      };
      const result = await Axios.patch(
        `http://localhost:2000/item/editCategory/${id}`,
        data
      );
      setTimeout(() => window.location.replace("/admin-home"), 900);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Stack align={"center"}></Stack>
      <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} p={8}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Product Name</FormLabel>
            <Input defaultValue={data?.name} ref={inputName}></Input>
          </FormControl>
          <Stack spacing={10}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={() => update(data?.id)}
              // isLoading="4s"
            >
              Confirm
            </Button>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};
