import { useState } from "react";
import { useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import { TextField, Button } from "../ui";
import { checkoutSchema } from "../../js/validation";
import { FaCreditCard, FaRegUser } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const [formLoading, setFormLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const submitHandler = async (values) => {
    setFormLoading(true);

    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/tickets/buy/${
          location.state?.ticket.id
        }`,
        {},
        {
          headers: {
            authorization: `bearer ${Cookies.get("jwt")}`,
          },
        }
      )
      .then(() => {
        toast.success("Вие успешно закупихте билет");
        navigate("../tickets", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response ? err.response.data : err.message);
        navigate("../tickets", { replace: true });
      });

    setFormLoading(false);
  };

  const formatToCCDate = (event) => {
    const value = event.target.value;

    if (event.key === "Backspace") {
      if (event.target.value.endsWith("/"))
        event.target.value = value.substr(0, value.length - 1);
    } else if (value.length === 2) event.target.value += "/";
  };

  return (
    <Formik
      initialValues={{
        firstName: user.fullName.split(" ")[0],
        lastName: user.fullName.split(" ")[1],
        email: user.email,
        ccNumber: "",
        ccExpire: "",
        ccCvv: "",
      }}
      validationSchema={checkoutSchema}
      onSubmit={submitHandler}
    >
      <Form>
        <div className="pb-8">
          <div className="flex items-center gap-2 font-semibold pb-4">
            <div className="text-lg text-primary-main">
              <FaRegUser />
            </div>
            Лична информация
          </div>

          <div className="md:flex gap-4 justify-between">
            <Field
              id="firstName"
              name="firstName"
              label="Име"
              placeholder="e.g. Даниел"
              disabled={true}
              maxLength={20}
              component={TextField}
              fullWidth
            />

            <Field
              id="lastName"
              name="lastName"
              label="Фамилия"
              placeholder="e.g. Димитров"
              disabled={true}
              maxLength={20}
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
            disabled={true}
            maxLength={60}
            component={TextField}
            fullWidth
          />
        </div>

        <div>
          <div className="flex items-center gap-2 font-semibold pb-4">
            <div className="text-lg text-primary-main w-fit rounded-full">
              <FaCreditCard />
            </div>
            Checkout информация
          </div>

          <Field
            id="ccNumber"
            name="ccNumber"
            label="Номер на дебитна карта"
            sublabel="Въведете 16-цифрения код на картата"
            placeholder="••••••••••••••••••••"
            disabled={formLoading}
            maxLength={16}
            component={TextField}
            fullWidth
          />

          <div className="md:flex gap-4 justify-between">
            <Field
              id="ccExpire"
              name="ccExpire"
              label="Дата на изтичане"
              sublabel="Въведете датата изписана на картата"
              placeholder="05/24"
              onKeyPress={formatToCCDate}
              disabled={formLoading}
              maxLength={5}
              component={TextField}
              fullWidth
            />

            <Field
              id="ccCvv"
              name="ccCvv"
              label="CVV"
              sublabel="Въведете тайният код на картата"
              placeholder="000"
              disabled={formLoading}
              maxLength={3}
              component={TextField}
              fullWidth
            />
          </div>
        </div>

        <Button
          type="submit"
          className={"flex justify-center mt-4 md:w-fit ml-auto"}
          disabled={formLoading}
          loading={formLoading}
          fullWidth
        >
          Завърши поръчката
        </Button>
      </Form>
    </Formik>
  );
}
