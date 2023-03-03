import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { BsFilterLeft } from "react-icons/bs";
import { BiReset, BiSearchAlt } from "react-icons/bi";
import Axios from "axios";
import { useEffect, useState } from "react";
import { UpdateItem } from "./UpdateItem";
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../redux/itemSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

export const ProductList = () => {
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const data = useSelector((state) => state.itemSlice.value);
  const [image, setImage] = useState("");
  const [edit, setEdit] = useState({});
  const [image2, setImage2] = useState("upload");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [sort, setSort] = useState("ASC");
  const [sort1, setSort1] = useState("ASC");
  const [order, setOrder] = useState("name");
  const [order1, setOrder1] = useState("price");
  const [searchProduct, setSearchProduct] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [state, setState] = useState(0);
  const dispatch = useDispatch();
  const dispatch1 = useDispatch();
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
      setData2(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAll();
  }, [edit]);

  const getCategory = async () => {
    try {
      const result = await Axios.get(`http://localhost:2000/item/category`);
      console.log(result.data);
      setData3(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getData = async () => {
    try {
      const result = await Axios.get(
        `http://localhost:2000/item/pagination?search_query=${searchProduct}&page=${
          page - 1
        }&limit=${limit}&order=${order ? order : "name"}&sort=${
          sort ? sort : "ASC"
        }&orderPrice=${order1 ? order1 : "price"}&sortPrice=${
          sort1 ? sort1 : "ASC"
        }`
      );
      console.log(result.data.result);
      console.log(result.data.result[0]?.Product_Categories[0]?.Category?.id);
      dispatch(syncData(result.data.result));
      setTotalPage(Math.ceil(result.data.totalRows / result.data.limit));
      setState(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [searchProduct, page, limit, sort, sort1]);

  async function fetchSort(filter) {
    setSort(filter);
  }

  useEffect(() => {
    fetchSort();
  }, []);

  async function fetchSort1(filter1) {
    setSort1(filter1);
  }

  useEffect(() => {
    fetchSort1();
  }, []);

  const formik = useFormik({
    initialValues: {
      searchName: ``,
    },
    validationSchema: Yup.object().shape({
      searchName: Yup.string().min(3, "Min. 3 words"),
    }),
    validateOnChange: false,
    onSubmit: async () => {
      const { searchName } = formik.values;
      setSearchProduct(searchName);
    },
  });

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

  const getByCategory = async () => {
    try {
      const result = await Axios.get(`http://localhost:2000/item/byCategory`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Center>
        <Flex border="2px" borderRadius="xl">
          <Box className="filter">
            <Box
              m="10px"
              mb="20px"
              borderWidth="2px"
              boxShadow="md"
              borderRadius="8px"
              borderColor="#285430"
            >
              <Box
                alignItems={"center"}
                h="50px"
                borderTopRadius="8px"
                align="center"
                bg="#E5D9B6"
                display="flex"
              >
                <Box h="25px" ml="10px">
                  <Icon color="#285430" boxSize="6" as={BsFilterLeft} />
                </Box>
                <Box h="25px">
                  <Text mx="10px" fontWeight="bold" color="#285430">
                    Filter & Search
                  </Text>
                </Box>
                <Icon
                  color="#285430"
                  sx={{ _hover: { cursor: "pointer" } }}
                  boxSize="6"
                  as={BiReset}
                  onClick={() => {
                    async function submit() {
                      setSearchProduct("");
                      document.getElementById("search").value = "";
                      formik.values.searchName = "";
                    }
                    submit();
                  }}
                />
              </Box>
              <Flex m={2} wrap="wrap">
                <FormControl w="" m={1}>
                  <FormLabel fontSize="x-small" color="#285430">
                    Sort
                  </FormLabel>
                  <Select
                    color={"#285430"}
                    borderColor="#285430"
                    onChange={(event) => {
                      fetchSort(event.target.value);
                    }}
                  >
                    <option value="ASC">A-Z</option>
                    <option value="DESC">Z-A</option>
                  </Select>
                </FormControl>
                <FormControl w="" m={1}>
                  <FormLabel fontSize="x-small" color="#285430">
                    Sort by Price
                  </FormLabel>
                  <Select
                    color={"#285430"}
                    borderColor="#285430"
                    onChange={(event) => {
                      fetchSort1(event.target.value);
                    }}
                  >
                    <option value="ASC">Low to High</option>
                    <option value="DESC">High to Low</option>
                  </Select>
                </FormControl>
                <FormControl w="" m={1}>
                  <FormLabel fontSize="x-small" color="#285430">
                    Sort by Category
                  </FormLabel>
                  <Select
                    color={"#285430"}
                    borderColor="#285430"
                    placeholder="Select category"
                    // onChange={(event) => {
                    //   fetchSort1(event.target.value);
                    // }}
                  >
                    {data3?.map((item) => {
                      return <option>{item.name}</option>;
                    })}
                  </Select>
                </FormControl>
                <FormControl w="" m={1}>
                  <FormLabel fontSize="x-small" color="#285430">
                    Show
                  </FormLabel>
                  <Select
                    color={"#285430"}
                    borderColor="#285430"
                    onChange={(event) => {
                      setLimit(event.target.value);
                    }}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                  </Select>
                </FormControl>
                <FormControl w="" m={1}>
                  <FormLabel fontSize="x-small" color="#285430">
                    Search Product
                  </FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="Search Product"
                      _placeholder={{ color: "#5F8D4E" }}
                      borderColor="#285430"
                      border="1px"
                      fontSize="18px"
                      color="gray.800"
                      id="search"
                      type="text"
                      onChange={(event) =>
                        formik.setFieldValue("searchName", event.target.value)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          formik.handleSubmit();
                        }
                      }}
                    />
                    <InputRightElement>
                      <Icon
                        fontSize="xl"
                        as={BiSearchAlt}
                        sx={{ _hover: { cursor: "pointer" } }}
                        onClick={() => formik.handleSubmit()}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText color="red">
                    {formik.errors.searchName}
                  </FormHelperText>
                </FormControl>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Center>

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
      <Box display="flex" justifyContent="center" alignContent="center">
        <Button
          onClick={() => {
            async function submit() {
              setPage(page === 1 ? 1 : page - 1);
            }
            submit();
            var pageNow = page - 1;
            pageNow = pageNow <= 0 ? 1 : pageNow;
            document.getElementById("pagingInput").value = parseInt(pageNow);
          }}
          bgColor={"#A4BE7B"}
          borderColor="#285430"
          border="2px"
          fontSize="14px"
          color="gray.800"
          width={"60px"}
          justifyContent="center"
          size="sm"
          mt="1rem"
        >
          Prev
        </Button>
        <Text alignSelf="center" mx="10px" pt="15px">
          {" "}
          {page} of {totalPage}
        </Text>
        <Button
          onClick={() => {
            async function submit() {
              setPage(totalPage === page ? page : page + 1);
            }
            submit();
            var pageNow = page + 1;
            pageNow = pageNow > totalPage ? page : pageNow;
            document.getElementById("pagingInput").value = parseInt(pageNow);
          }}
          bgColor={"#A4BE7B"}
          borderColor="#285430"
          border="2px"
          fontSize="14px"
          color="gray.800"
          width={"60px"}
          justifyContent="center"
          size="sm"
          mt="1rem"
        >
          Next
        </Button>
      </Box>
    </div>
  );
};
