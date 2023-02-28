import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

export const UpdateItem = ({ data }) => {
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  const inputName = useRef("");
  const inputPrice = useRef(0);
  const inputDescription = useRef("");
  const inputCategory = useRef(0);

  const updateProduct = async (id) => {
    try {
      const update = {
        name: inputName.current.value,
        description: inputDescription.current.value,
        price: inputPrice.current.value,
        CategoryId: inputCategory.current.value,
      };
      const result = await Axios.patch(
        `http://localhost:2000/item/edit/${id}`,
        update
      );
      //   Swal.fire({
      //     icon: "success",
      //     text: "Product Updated",
      //     width: "370px",
      //   });
      setTimeout(() => window.location.replace("/admin-home"), 900);
    } catch (err) {
      console.log(err);
    }
  };

  const listCategory = async () => {
    try {
      const result = await Axios.get(`http://localhost:2000/item/category`);
      console.log(result.data);
      setData2(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    listCategory();
  }, []);

  const getAll = async () => {
    try {
      const result = await Axios.get(`http://localhost:2000/item/product`);
      console.log(result.data);
      const selected = result.data.map(
        (item) => item.Product_Categories[0].Category.name
      );
      console.log(selected);
      setData3(selected);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      <Stack align={"center"}></Stack>
      <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} p={8}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Product Name</FormLabel>
            <Input defaultValue={data?.name} ref={inputName}></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children="Rp"
              />
              <Input defaultValue={data?.price} ref={inputPrice}></Input>
            </InputGroup>
          </FormControl>
          <FormControl>
            <Flex>
              <FormLabel>Category</FormLabel>
            </Flex>
            <Select ref={inputCategory}>
              {data2?.map((item) => {
                return (
                  <option
                    // selected={item.Product_Categories[0].Category}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          <Stack spacing={10}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={() => updateProduct(data?.id)}
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
