import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { registerSchema } from "../../js/validation";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, TextField } from "../ui";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

export default function RegisterForm() {
  const [formLoading, setFormLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    setFormLoading(true);

    await axios
      .post(`${import.meta.env.VITE_API_URL}/auth/register`, values)
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
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={registerSchema}
      onSubmit={submitHandler}
    >
      <Form>
        <div className="md:flex md:gap-6 md:justify-between">
          <Field
            id="firstName"
            name="firstName"
            label="Име"
            placeholder="e.g. Даниел"
            disabled={formLoading}
            maxLength={30}
            component={TextField}
            fullWidth
          />

          <Field
            id="lastName"
            name="lastName"
            label="Фамилия"
            placeholder="e.g. Димитров"
            disabled={formLoading}
            maxLength={30}
            component={TextField}
            fullWidth
          />
        </div>

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
          maxLength={100}
          component={TextField}
          fullWidth
        />

        <Field
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Потвърди паролата"
          placeholder="••••••••••"
          disabled={formLoading}
          maxLength={20}
          component={TextField}
          fullWidth
        />

        <Button
          type="submit"
          className="flex justify-center mt-4"
          disabled={formLoading}
          fullWidth
        >
          {formLoading ? (
            <FaSpinner className="text-xl animate-spin" />
          ) : (
            "Създай акаунт"
          )}
        </Button>

        <NavLink to="/login">
          <Button
            variant="outlined"
            className="mt-2"
            disabled={formLoading}
            fullWidth
          >
            Вход
          </Button>
        </NavLink>
      </Form>
    </Formik>
  );
}
