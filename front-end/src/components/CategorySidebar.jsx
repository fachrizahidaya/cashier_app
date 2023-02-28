import { Button, FormLabel, Stack } from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";

export const CategorySidebar = () => {
  const [data, setData] = useState();
  const getCategory = async () => {
    try {
      const result = await Axios.get(`http://localhost:2000/item/category`);
      console.log(result.data);
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      <FormLabel>Category</FormLabel>
      <Stack>
        {data?.map((item) => {
          return <Button variant={"ghost"}>{item.name}</Button>;
        })}
      </Stack>
    </div>
  );
};
