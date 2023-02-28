import React, { useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Axios from "axios";

export const CategoryComp = () => {
  const inputName = useRef("");
  const { isOpen, onClose, onOpen } = useDisclosure();

  const addCategory = async () => {
    try {
      const data = {
        name: inputName.current.value,
      };
      const result = await Axios.post(
        `http://localhost:2000/item/category`,
        data
      );
      setTimeout(() => window.location.replace("/admin-home"), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <HStack bg="white">
        <MenuItem onClick={onOpen}>Add Category</MenuItem>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay zIndex="1000" />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Box
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                p={8}
              >
                <Stack spacing={4}>
                  <FormControl>
                    <FormLabel>Category Name</FormLabel>
                    <Input ref={inputName}></Input>
                  </FormControl>

                  <Stack spacing={10}>
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      onClick={addCategory}
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
