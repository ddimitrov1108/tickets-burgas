import { useState } from "react";
import { useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import { TextField, Button } from "../ui";
import { checkoutSchema } from "../../js/validation";
import { FaCreditCard, FaRegUser } from "react-icons/fa";

export default function CheckoutForm() {
  const [formLoading, setFormLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const submitHandler = async (values) => {
    console.log(values);
    alert(1);
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
              maxLength={30}
              component={TextField}
              fullWidth
            />

            <Field
              id="lastName"
              name="lastName"
              label="Фамилия"
              placeholder="e.g. Димитров"
              disabled={true}
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
              placeholder="0524"
              disabled={formLoading}
              maxLength={4}
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
          Завършване на поръчката
        </Button>
      </Form>
    </Formik>
  );
}
