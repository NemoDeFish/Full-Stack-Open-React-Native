import * as yup from "yup";
import { Pressable, StyleSheet, View } from "react-native";
import { Formik } from "formik";

import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignInForm = ({ onSubmit }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
    },
    button: {
      backgroundColor: theme.colors.primary,
      borderRadius: 5,
      color: "white",
      padding: 20,
      margin: 20,
      textAlign: "center",
    },
    input: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme.colors.textSecondary,
      padding: 20,
      marginBottom: 0,
      margin: 20,
      fontSize: 18,
    },
  });

  return (
    <View style={styles.container}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        style={styles.input}
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        style={styles.input}
        secureTextEntry
      />
      <Pressable onPress={onSubmit}>
        <Text style={styles.button} fontWeight="bold" fontSize="subheading">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
