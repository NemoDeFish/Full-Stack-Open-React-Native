import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import * as yup from "yup";

import FormikTextInput from "./FormikTextInput";
import Button from "./Button";
import useSignIn from "../hooks/useSignIn";
import { CREATE_USER } from "../graphql/mutations";

const initialValues = {
  username: "",
  password: "",
  passwordConfirm: "",
};

const validationSchema = yup.object().shape({
  /* Solution: gives error message specific to the error */
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters long")
    .max(30, "Username must be at most 30 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters long")
    .max(50, "Password must be at least 50 characters long"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password confirmation must match the password")
    .required("Password confirmation is required"),
});

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
  },
  fieldContainer: {
    marginBottom: 15,
  },
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="username" placeholder="Username" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="passwordConfirm"
          placeholder="Password confirmation"
          secureTextEntry
        />
      </View>
      <Button onPress={onSubmit}>Sign up</Button>
    </View>
  );
};

const SignUp = () => {
  const [signIn] = useSignIn();
  const [mutate] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    /* Solution: doesn't handle error catching */
    try {
      /* Solution: destrucutres 'username' and 'password' instead of deleting 'passwordConfirm' */
      // const { username, password } = values;
      // const user = { username, password };

      delete values.passwordConfirm;

      const user = values;

      await mutate({ variables: { user } });
      await signIn(user);

      navigate("/", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
