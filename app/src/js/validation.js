import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Невалидно поле")
    .matches(/^(?!.*@[^,]*,)/)
    .required("Полето е задължително"),
    password: Yup.string()
    .required("Полето е задължително"),
});

export const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-z ,.'-]+$/i, "Невалидно поле")
    .required("Полето е задължително"),
  lastName: Yup.string()
    .matches(/^[a-z ,.'-]+$/i, "Невалидно поле")
    .required("Полето е задължително"),
  email: Yup.string().email("Невалидно поле").required("Полето е задължително"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Минимум 8 символа от които една цифра и един специален символ"
    )
    .required("Полето е задължително"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Паролите трябва да съвпадат")
    .required("Полето е задължително"),
});

export const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Полето е задължително"),
  newPassword: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Минимум 8 символа от които една цифра и един специален символ"
    )
    .required("Полето е задължително"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Паролите трябва да съвпадат")
    .required("Полето е задължително"),
});

export const changeNamesSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-z ,.'-]+$/i, "Невалидно поле")
    .required("Полето е задължително"),
  lastName: Yup.string()
    .matches(/^[a-z ,.'-]+$/i, "Невалидно поле")
    .required("Полето е задължително"),
  password: Yup.string().required("Полето е задължително"),
});

export const checkoutSchema = Yup.object().shape({
  debitCardNumber: Yup.string()
    .matches(/^\d+$/, "Невалидно поле")
    .length(16, "Трябва да въведете 16-цифрения код на картата")
    .required("Полето е задължително"),
  debitCardDateOfExpire: Yup.string()
    .matches(/^\d+$/, "Невалидно поле")
    .length(4)
    .required("Полето е задължително"),
  debitCardCvv: Yup.string()
    .matches(/^\d+$/, "Невалидно поле")
    .length(3)
    .required("Полето е задължително"),
});
