import React from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import { ProductList } from "../components/ProductList";
import { CategoryList } from "../components/CategoryList";

export const AdminPage = () => {
  return (
    <>
      <NavbarAdmin />
      <Box>
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Product</Tab>
            <Tab>Category</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ProductList />
            </TabPanel>
            <TabPanel>
              <CategoryList />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};
