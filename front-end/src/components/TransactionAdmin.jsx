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
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";

export const TransactionAdmin = () => {
  const [data, setData] = useState();

  const getAll = async () => {
    try {
      const result = await Axios.get(
        `http://localhost:2000/transaction/findAll`
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
        <TableContainer m={"auto"} maxW={"80%"}>
          <Table size="md">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Invoice</Th>
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
                      <Text>{item.invoice_no}</Text>
                    </Td>
                    <Td>
                      {new Intl.NumberFormat("IND", {
                        style: "currency",
                        currency: "IDR",
                      }).format(item.totalOrder)}
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
