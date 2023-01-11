import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { loginSchema } from "../../js/validation";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, TextField } from "../ui";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

export default function LoginForm() {
  const [formLoading, setFormLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    setFormLoading(true);

    await axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, values)
      .then((response) => {
        Cookies.set("jwt", response.headers.authorization, {
          expires: 7,
          secure: true,
        });
        setFormLoading(false);
        navigate("/", { replace: true })
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response ? err.response.data : err.message);
        setFormLoading(false);
      });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={submitHandler}
    >
      <Form>
        <Field
          id="email"
          name="email"
          type="email"
          label="Имейл Адрес"
          placeholder="name@address.com"
          disabled={formLoading}
          maxLength={60}
          component={TextField}
          fullWidth
        />

        <Field
          id="password"
          name="password"
          type="password"
          label="Парола"
          placeholder="••••••••••"
          disabled={formLoading}
          maxLength={20}
          component={TextField}
          fullWidth
        />

        <Button
          type="submit"
          className={"flex justify-center mt-4"}
          disabled={formLoading}
          fullWidth
        >
          {formLoading ? (
            <FaSpinner className="text-xl animate-spin" />
          ) : (
            "Вход"
          )}
        </Button>

        <NavLink to="/register">
          <Button
            variant="outlined"
            className="mt-2"
            disabled={formLoading}
            fullWidth
          >
            Създай акаунт
          </Button>
        </NavLink>
      </Form>
    </Formik>
  );
}
