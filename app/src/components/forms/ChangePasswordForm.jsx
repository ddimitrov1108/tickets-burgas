import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { changePasswordSchema } from "../../js/validation";
import { Button, TextField } from "../ui";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";

export default function ChangePasswordForm({}) {
  const [formLoading, setFormLoading] = useState(false);

  const submitHandler = async (values) => {
    setFormLoading(true);

    await axios
      .post(`${import.meta.env.VITE_API_URL}/user/update/password`, values, {
        headers: {
          authorization: `bearer ${Cookies.get("jwt")}`,
        },
      })
      .then(() => {
        toast.success("Паролата Ви беше успешно променена!");
        values.currentPassword = "";
        values.newPassword = "";
        values.confirmNewPassword = "";
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
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }}
      validationSchema={changePasswordSchema}
      onSubmit={submitHandler}
    >
      <Form>
        <Field
          id="currentPassword"
          name="currentPassword"
          type="password"
          label="Текуща парола"
          placeholder="••••••••••"
          disabled={formLoading}
          maxLength={20}
          component={TextField}
          fullWidth
        />

        <Field
          id="newPassword"
          name="newPassword"
          type="password"
          label="Нова парола"
          placeholder="••••••••••"
          disabled={formLoading}
          maxLength={20}
          component={TextField}
          fullWidth
        />
        <Field
          id="confirmNewPassword"
          name="confirmNewPassword"
          type="password"
          label="Потвърди Новата парола"
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
          Смяна на Паролата
        </Button>
      </Form>
    </Formik>
  );
}
