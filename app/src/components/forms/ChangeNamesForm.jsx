import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import { changeNamesSchema } from "../../js/validation";
import { Button, TextField } from "../ui";
import { setUser } from "../../store/slices/userSlice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

export default function ChangeNamesForm() {
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState(false);
  const user = useSelector(state => state.user);

  const submitHandler = async (values) => {
    setFormLoading(true);
    console.log(values);

    await axios
      .post(`${import.meta.env.VITE_API_URL}/user/update/name`, values, {
        headers: {
          authorization: `bearer ${Cookies.get("jwt")}`,
        },
      })
      .then(() => {
        dispatch(
          setUser({
            ...user,
            fullName: `${values.firstName} ${values.lastName}`,
          })
        );

        values.firstName = "";
        values.lastName = "";
        values.password = "";

        toast.success("Вашите имена бяха сменени успешно!");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response ? err.response.data : err.message);
      });

    setFormLoading(false);
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        password: "",
      }}
      validationSchema={changeNamesSchema}
      onSubmit={submitHandler}
    >
      <Form>
        <Field
          id="firstName"
          name="firstName"
          label="Име"
          placeholder="e.g. Даниел"
          disabled={formLoading}
          maxLength={20}
          component={TextField}
          fullWidth
        />

        <Field
          id="lastName"
          name="lastName"
          label="Фамилия"
          placeholder="e.g. Димитров"
          disabled={formLoading}
          maxLength={20}
          component={TextField}
          fullWidth
        />

        <Field
          id="password"
          name="password"
          type="password"
          label="Текуща парола"
          placeholder="••••••••••"
          disabled={formLoading}
          maxLength={20}
          component={TextField}
          fullWidth
        />

        <Button
          type="submit"
          className={"flex items-center justify-center mt-4 md:w-fit ml-auto"}
          disabled={formLoading}
          loading={formLoading}
          fullWidth
        >
          Смяна на имената
        </Button>
      </Form>
    </Formik>
  );
}
