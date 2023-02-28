import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  Image,
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
import { useEffect, useState } from "react";
import { UpdateItem } from "./UpdateItem";

export const ProductList = () => {
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");
  const [edit, setEdit] = useState({});
  const [image2, setImage2] = useState("upload");
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  const OverlayOne = () => <ModalOverlay />;
  const [overlay, setOverlay] = useState(<OverlayOne />);

  const getAll = async () => {
    try {
      const result = await Axios.get(`http://localhost:2000/item/product`);
      console.log(result.data);
      const selected = result.data.map(
        (item) => item.Product_Categories[0].Category.name
      );
      console.log(selected);
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAll();
  }, [edit]);

  const handleChoose = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async (id) => {
    const data = new FormData();
    data.append("file", image);

    const resultImage = await Axios.post(
      `http://localhost:2000/item/single-uploaded/${id}`,
      data,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );

    setImage2(resultImage.data.picture);
    setImage({ images: "" });
    window.location.replace("/admin-home");
  };

  const onDelete = async (id) => {
    try {
      const result = await Axios.delete(
        `http://localhost:2000/item/remove/${id}`
      );
      getAll();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Flex>
        <TableContainer m={"auto"} maxW={"80%"}>
          <Table size="md">
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Price</Th>
                <Th>Picture</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((item) => {
                return (
                  <Tr>
                    <Td>{item.name}</Td>
                    <Td>
                      {new Intl.NumberFormat("IND", {
                        style: "currency",
                        currency: "IDR",
                      }).format(item.price)}
                    </Td>
                    <Td>
                      {" "}
                      <Image
                        boxSize={"70px"}
                        src={`http://localhost:2000/${item.picture}`}
                      ></Image>
                      <ButtonGroup size="sm">
                        <form encType="multipart/form-data">
                          <input
                            color="#285430"
                            type={"file"}
                            accept="image/*"
                            name="file"
                            size={"50px"}
                            onChange={(e) => handleChoose(e)}
                          ></input>
                        </form>
                        <Button
                          bgColor={"#A4BE7B"}
                          borderColor="#285430"
                          border="2px"
                          fontSize="14px"
                          color="gray.800"
                          width={"50%"}
                          justifyContent="center"
                          onClick={() => handleUpload(item.id)}
                          size="sm"
                        >
                          Upload
                        </Button>
                      </ButtonGroup>
                    </Td>
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
              <UpdateItem data={edit} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </div>
  );
};
