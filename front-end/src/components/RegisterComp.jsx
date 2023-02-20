import {
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
  MenuItem,
} from "@chakra-ui/react";
import Axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";
const url = `http://localhost:2000/user/register`;

export const RegisterComp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const registerSchema = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(8, "Password at least 8 characters"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "password not match"
    ),
  });

  const onRegister = async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        return "error";
      }
      const result = await Axios.post(url, data);
      localStorage.setItem("token", result.data.token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <HStack bg="white">
        <MenuItem onClick={onOpen}>Create New User</MenuItem>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay zIndex="1000" />
          <ModalContent>
            <ModalHeader>
              <Center>Register Here</Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={registerSchema}
                onSubmit={(values, action) => {
                  onRegister(values);
                  action.setFieldValue("username", "");
                  action.setFieldValue("email", "");
                  action.setFieldValue("password", "");
                  action.setFieldValue("confirmPassword", "");
                }}
              >
                {(props) => {
                  return (
                    <>
                      <Form>
                        <VStack spacing={4} align="flex-start">
                          <FormControl>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <Field
                              as={Input}
                              type="text"
                              name="username"
                              variant="filled"
                            />
                            <ErrorMessage
                              style={{ color: "red" }}
                              component="div"
                              name="username"
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Field
                              as={Input}
                              type="email"
                              name="email"
                              variant="filled"
                            />
                            <ErrorMessage
                              style={{ color: "red" }}
                              component="div"
                              name="email"
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Field
                              as={Input}
                              type="password"
                              name="password"
                              variant="filled"
                            />
                            <ErrorMessage
                              component="div"
                              name="password"
                              style={{ color: "red" }}
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Konfirmasi Password</FormLabel>
                            <Field
                              as={Input}
                              type="password"
                              name="confirmPassword"
                              variant="filled"
                            />
                            <ErrorMessage
                              component="div"
                              name="confirmPassword"
                              style={{ color: "red" }}
                            />
                          </FormControl>
                          <ModalFooter>
                            <Button type="submit" colorScheme="pink" mr={3}>
                              Daftar
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                          </ModalFooter>
                        </VStack>
                      </Form>
                    </>
                  );
                }}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
      </HStack>
    </div>
  );
};
