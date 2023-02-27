import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import { AdminReport } from "../components/AdminReport";
import NavbarAdmin from "../components/NavbarAdmin";
import { TransactionAdmin } from "../components/TransactionAdmin";

export const AdminTransaction = () => {
  return (
    <div>
      <NavbarAdmin />
      <Box>
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>List</Tab>
            <Tab>Report</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TransactionAdmin />
            </TabPanel>
            <TabPanel>
              <AdminReport />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};
