import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartSync } from "../redux/cartSlice";
import { addCart } from "../redux/userSlice";
import Swal from "sweetalert2";

export const MenuUser = () => {
  const [data, setData] = useState();
  const { id } = useSelector((state) => state.userSlice.value);
  const dispatch = useDispatch();
  console.log(id);

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

  const onCreate = async (ItemId) => {
    try {
      const create = {
        UserId: id,
        ItemId,
      };
      const result = await Axios.post(
        `http://localhost:2000/transaction/create`,
        create
      );
      console.log(result.data);
      const res = await Axios.get(
        `http://localhost:2000/transaction/findBy/${id}`
      );
      dispatch(cartSync(res.data));
      dispatch(addCart(res.data));
      getAll();
      Swal.fire({
        icon: "success",
        text: `Add to Cart Success`,
        timer: 2000,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: `Add Cart Failed`,
      });
      console.log(err);
    }
  };

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
                  {item.Carts.find((item2) => item2.UserId === id) ? (
                    <Button disabled variant="solid" colorScheme="blue">
                      Add
                    </Button>
                  ) : (
                    <Button
                      variant="solid"
                      colorScheme="blue"
                      onClick={() => onCreate(item.id)}
                    >
                      Add
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </>
          );
        })}
      </Wrap>
    </div>
  );
};
