import {
  Box,
  Button,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Stack,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { cartSync } from "../redux/cartSlice";
import { delCart } from "../redux/userSlice";

export const TransactionSidebar = () => {
  const { id } = useSelector((state) => state.userSlice.value);
  const [qty, setQty] = useState(false);
  const [data2, setData2] = useState(0);
  const [data3, setData3] = useState();
  const data = useSelector((state) => state.cartSlice.value);
  const dispatch = useDispatch();

  const getCart = async () => {
    try {
      const result = await Axios.get(
        `http://localhost:2000/transaction/findBy/${id}`
      );
      console.log(result.data);
      setData3(result.data);
      dispatch(cartSync(result.data));
      const selectedItem = result.data
        .map((item3) => item3.totalCheckout)
        .reduce((a, b) => a + b);
      console.log(selectedItem);
      setData2(selectedItem);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCart();
  }, [id]);

  const onQty = async (idCart, qty) => {
    try {
      const update = {
        id: idCart,
        qty,
      };
      const result = await Axios.patch(
        `http://localhost:2000/transaction/updateQty/${id}`,
        update
      );
      getCart();
      setQty(!qty);
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async (id) => {
    try {
      await Axios.delete(`http://localhost:2000/transaction/remove/${id}`);
      const result = await Axios.get(
        `http://localhost:2000/transaction/remove/${id}`
      );
      dispatch(cartSync(result.data));
      dispatch(delCart());
      getCart();
    } catch (err) {
      console.log(err);
    }
  };

  const onCreate = async () => {
    try {
      const create = {
        totalOrder: data2,
        UserId: id,
        ItemId: data3[0]?.ItemId,
      };
      const result = await Axios.post(
        `http://localhost:2000/transaction/createOrder/${id}`,
        create
      );
      Swal.fire({
        icon: "success",
        text: `Success`,
        timer: 2000,
      });
      setTimeout(() => window.location.replace("/home"), 900);
    } catch (err) {
      console.log(err);
    }
  };

  const onSave = () => {
    try {
      Swal.fire({
        icon: "success",
        text: `Saved`,
        timer: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Flex justifyContent={"space-between"}>
        <FormLabel>Total Belanja</FormLabel>
        <FormLabel>
          {new Intl.NumberFormat("IND", {
            style: "currency",
            currency: "IDR",
          }).format(data2)}
        </FormLabel>
      </Flex>
      <HStack>
        <Button onClick={onSave}>Save</Button>
        <Button>Print</Button>
      </HStack>
      <Button onClick={() => onCreate()} w={"full"}>
        Pay
      </Button>
      <Stack>
        <Box boxShadow={"2xl"}>
          {data?.map((item2) => {
            return (
              <Grid
                pl={"25px"}
                h="100px"
                mt={"10px"}
                //   w={"200px"}
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(4, 1fr)"
                gap={4}
                border="1px"
                borderRadius={"lg"}
              >
                <GridItem colSpan={2}>{item2.Item.name}</GridItem>
                <GridItem colSpan={2}>
                  {" "}
                  {new Intl.NumberFormat("IND", {
                    style: "currency",
                    currency: "IDR",
                  }).format(item2.totalCheckout)}
                </GridItem>
                <GridItem colSpan={2}>
                  <HStack
                    ml={"20px"}
                    mr="20px"
                    maxW="200px"
                    textColor={"#285430"}
                  >
                    <Button
                      variant={"unstyled"}
                      onClick={() => {
                        var qtyMin = item2.qty - 1;
                        onQty(item2.id, qtyMin);
                        qtyMin = onQty <= 0 ? 1 : onQty;
                        document.getElementById("qtyInput").value =
                          parseInt(qtyMin);
                      }}
                    >
                      -
                    </Button>
                    <Box>{item2.qty}</Box>
                    <Button
                      variant={"unstyled"}
                      onClick={() => {
                        onQty(item2.id, item2.qty + 1);
                      }}
                    >
                      +
                    </Button>
                  </HStack>
                </GridItem>
                <GridItem colSpan={2}>
                  <Button
                    pt={"10px"}
                    ml={"50px"}
                    variant={"unstyled"}
                    onClick={() => onDelete(item2.id)}
                    fontSize="sm"
                    textColor={"#285430"}
                  >
                    Delete
                  </Button>
                </GridItem>
              </Grid>
            );
          })}
        </Box>
      </Stack>
    </div>
  );
};
