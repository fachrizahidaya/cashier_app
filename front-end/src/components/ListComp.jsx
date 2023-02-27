import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const ListComp = () => {
  const [data, setData] = useState();
  const { id } = useSelector((state) => state.userSlice.value);
  const getAll = async () => {
    try {
      const result = await Axios.get(
        `http://localhost:2000/transaction/findOrder/${id}`
      );
      console.log(result.data);
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAll();
  }, [id]);

  return (
    <div>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {data?.map((item) => {
          return (
            <Card>
              <CardHeader>
                <Heading size="md">{item.invoice_no}</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  Total:
                  {new Intl.NumberFormat("IND", {
                    style: "currency",
                    currency: "IDR",
                  }).format(item.totalOrder)}
                </Text>
              </CardBody>
              <CardFooter>
                <Button>View here</Button>
              </CardFooter>
            </Card>
          );
        })}
      </SimpleGrid>
    </div>
  );
};
