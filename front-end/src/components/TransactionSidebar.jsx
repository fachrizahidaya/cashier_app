import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

export const TransactionSidebar = () => {
  return (
    <div>
      <Flex justifyContent={"space-between"}>
        <FormLabel>Total Belanja</FormLabel>
        <FormLabel>
          {" "}
          {new Intl.NumberFormat("IND", {
            style: "currency",
            currency: "IDR",
          }).format(10000)}
        </FormLabel>
      </Flex>
      <Stack>
        <Box boxShadow={"2xl"}>
          <Grid
            h="100px"
            //   w={"200px"}
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(4, 1fr)"
            gap={4}
          >
            <GridItem colSpan={2}>Tomat</GridItem>
            <GridItem colSpan={2}>
              {" "}
              {new Intl.NumberFormat("IND", {
                style: "currency",
                currency: "IDR",
              }).format(10000)}
            </GridItem>
            <GridItem colSpan={2}>
              <HStack ml={"20px"} mr="20px" maxW="200px" textColor={"#285430"}>
                <Button
                  pb={"4"}
                  variant={"unstyled"}
                  // onClick={() => {
                  //   var qtyMin = item.qty - 1;
                  //   onQty(item.id, qtyMin);
                  //   qtyMin = onQty <= 0 ? 1 : onQty;
                  //   document.getElementById("qtyInput").value = parseInt(qtyMin);
                  // }}
                >
                  -
                </Button>
                <Text w={"10px"}>{/* {item.qty} */}</Text>
                <Button
                  pb={"4"}
                  variant={"unstyled"}
                  // onClick={() => {
                  //   onQty(item.id, item.qty + 1);
                  // }}
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
                //   onClick={() => onDelete(item.id)}
                fontSize="sm"
                textColor={"#285430"}
              >
                Delete
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </Stack>
    </div>
  );
};
