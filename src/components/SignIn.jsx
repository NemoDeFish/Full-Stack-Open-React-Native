import { StyleSheet, View } from "react-native";
import { useNavigate } from "react-router-native";
import { Formik } from "formik";
import * as yup from "yup";

import Button from "./Button";
import FormikTextInput from "./FormikTextInput";
import useSignIn from "../hooks/useSignIn";

/* Solution: declare the styles for all components once inside a file globally instead of inside individual components */
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    /* Solution: use padding for outer container instead of margin for each inner <FormikTextInput> */
    padding: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
});

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      {/* Solution: wraps <FormikTextInput> inside <View> and applies 'style.fieldContainer' there so that the marginBottom is applied to both the <TextInput> and the <Text> error, instead of directly applying the style to <FormikTextInput>, which makes the style applied to <TextInput> only, leaving no margin after the <Text> error*/}
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="username"
          placeholder="Username"
          style={styles.field}
        />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="password"
          placeholder="Password"
          style={styles.field}
          secureTextEntry
        />
      </View>

      <Button onPress={onSubmit}>Sign in</Button>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
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
