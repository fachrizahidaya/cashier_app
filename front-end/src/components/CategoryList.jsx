import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { UpdateCategory } from "./UpdateCategory";

export const CategoryList = () => {
  const [data, setData] = useState();
  const [edit, setEdit] = useState({});
  const OverlayOne = () => <ModalOverlay />;
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();

  const getAll = async () => {
    try {
      const result = await Axios.get(`http://localhost:2000/item/category`);
      console.log(result.data);
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAll();
  }, [edit]);

  const onDelete = async (id) => {
    try {
      const result = await Axios.delete(
        `http://localhost:2000/item/removeCategory/${id}`
      );
      getAll();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Flex>
        <TableContainer m={"auto"} maxW={"45%"}>
          <Table size="md">
            <Thead>
              <Tr>
                <Th>Category</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((item) => {
                return (
                  <Tr>
                    <Td>{item.name}</Td>

                    <Td>
                      <HStack>
                        <Button
                          variant={"ghost"}
                          onClick={() => {
                            setEdit(item);
                            setOverlay(<OverlayOne />);
                            onOpen();
                          }}
                        >
                          <Icon as={EditIcon}></Icon>
                        </Button>

                        <Button
                          variant={"ghost"}
                          onClick={() => onDelete(item.id)}
                        >
                          <Icon as={DeleteIcon}></Icon>
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          {overlay}
          <ModalContent border="2px">
            <ModalCloseButton />
            <ModalBody>
              <UpdateCategory data={edit} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </div>
  );
};
