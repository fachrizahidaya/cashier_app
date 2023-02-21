import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const ItemComp = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const inputName = useRef("");
  const inputPrice = useRef(0);
  const inputDescription = useRef("");
  const inputCategory = useRef(0);
  const [data, setData] = useState();

  const addProduct = async () => {
    try {
      const product = {
        name: inputName.current.value,
        description: inputDescription.current.value,
        price: inputPrice.current.value,
        CategoryId: inputCategory.current.value,
      };
      const result = await Axios.post(
        `http://localhost:2000/item/product`,
        product
      );
      setTimeout(() => window.location.replace("/adminHome"), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const listCategory = async () => {
    try {
      const result = await Axios.get(`http://localhost:2000/item/category`);
      console.log(result.data);
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    listCategory();
  }, []);

  return (
    <div>
      <HStack bg="white">
        <MenuItem onClick={onOpen}>Add Product</MenuItem>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay zIndex="1000" />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Stack align={"center"}></Stack>
              <Box
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                p={8}
              >
                <Stack spacing={4}>
                  <FormControl>
                    <FormLabel>Product Name</FormLabel>
                    <Input ref={inputName}></Input>
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
                      <Input ref={inputPrice}></Input>
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea ref={inputDescription}></Textarea>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Category</FormLabel>
                    <Select placeholder="Select Category" ref={inputCategory}>
                      {data?.map((item) => {
                        return <option value={item.id}>{item.name}</option>;
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
                      onClick={addProduct}
                      // isLoading="4s"
                    >
                      Confirm
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </HStack>
    </div>
  );
};
