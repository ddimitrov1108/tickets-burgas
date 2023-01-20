import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Невалидно поле")
    .matches(/^(?!.*@[^,]*,)/)
    .max(60, "Максимум 60 символа")
    .required("Полето е задължително"),
  password: Yup.string()
    .max(20, "Максимум 20 символа")
    .required("Полето е задължително"),
});

export const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-z ,.'-]+$/i, "Невалидно поле")
    .max(20, "Максимум 20 символа")
    .required("Полето е задължително"),
  lastName: Yup.string()
    .matches(/^[a-z ,.'-]+$/i, "Невалидно поле")
    .max(20, "Максимум 20 символа")
    .required("Полето е задължително"),
  email: Yup.string()
    .email("Невалидно поле")
    .max(60, "Максимум 60 символа")
    .required("Полето е задължително"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Минимум 8 символа от които една цифра и един специален символ"
    )
    .max(20, "Максимум 20 символа")
    .required("Полето е задължително"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Паролите трябва да съвпадат")
    .max(20, "Максимум 20 символа")
    .required("Полето е задължително"),
});

export const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .max(20, "Максимум 20 символа")
    .required("Полето е задължително"),
  newPassword: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Минимум 8 символа от които една цифра и един специален символ"
    )
    .max(20, "Максимум 20 символа")
    .required("Полето е задължително"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Паролите трябва да съвпадат")
    .max(20, "Максимум 20 символа")
    .required("Полето е задължително"),
});

export const changeNamesSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-z ,.'-]+$/i, "Невалидно поле")
    .max(20, "Максимум 20 символа")
    .required("Полето е задължително"),
  lastName: Yup.string()
    .matches(/^[a-z ,.'-]+$/i, "Невалидно поле")
    .max(20, "Максимум 20 символа")
    .required("Полето е задължително"),
  password: Yup.string()
    .max(20, "Максимум 20 символа")
    .required("Полето е задължително"),
});

export const checkoutSchema = Yup.object().shape({
  ccNumber: Yup.string()
    .matches(/^\d+$/, "Невалидно поле")
    .length(16, "Трябва да въведете 16-цифрения код на картата")
    .required("Полето е задължително"),
  ccExpire: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, "Невалидно поле")
    .length(5)
    .required("Полето е задължително"),
  ccCvv: Yup.string()
    .matches(/^\d+$/, "Невалидно поле")
    .length(3)
    .required("Полето е задължително"),
});
