import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  Wrap,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";

export const MenuUser = () => {
  const [data, setData] = useState();

  const getAll = async () => {
    try {
      const result = await Axios.get(`http://localhost:2000/item/product`);
      console.log(result.data);
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      <Wrap>
        {data?.map((item) => {
          return (
            <>
              <Card maxW="sm">
                <CardBody>
                  <Image
                    boxSize={"50px"}
                    src={`http://localhost:2000/${item.picture}`}
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
                  <Stack mt="3" spacing="2">
                    <Text>
                      {item.name.substring(0, 10)} {"..."}
                    </Text>

                    <Text color="blue.600">
                      {" "}
                      {new Intl.NumberFormat("IND", {
                        style: "currency",
                        currency: "IDR",
                      }).format(item.price)}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Button variant="solid" colorScheme="blue">
                    Add
                  </Button>
                </CardFooter>
              </Card>
            </>
          );
        })}
      </Wrap>
    </div>
  );
};
