import { ArrowRightIcon, Icon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";

export const AdminReport = () => {
  const [data, setData] = useState();

  const getAll = async () => {
    try {
      const result = await Axios.get(
        `http://localhost:2000/transaction/findTotal`
      );
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
      <Flex>
        <Input w={"auto"} type={"date"}></Input>
        <ArrowRightIcon />
        <Input w={"auto"} type={"date"}></Input>
      </Flex>
      <Flex>
        <TableContainer m={"auto"} maxW={"80%"}>
          <Table size="md">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((item) => {
                return (
                  <Tr>
                    <Td>
                      {new Date(item.createdAt).toLocaleString("en", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </Td>

                    <Td>
                      {new Intl.NumberFormat("IND", {
                        style: "currency",
                        currency: "IDR",
                      }).format(item.total)}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </div>
  );
};
