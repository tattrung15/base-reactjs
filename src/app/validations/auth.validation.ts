import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required("Không được để trống"),
  password: Yup.string().required("Không được để trống"),
});

export const signUpValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(6, "Tối thiểu 6 ký tự")
    .max(40, "Tối đa 40 ký tự")
    .matches(/^[\d\w]+$/, "Chỉ bao gồm a-z, A-Z, 0-9"),
  password: Yup.string().required("Không được để trống"),
  confirmPassword: Yup.string()
    .required("Không được để trống")
    .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
  phone: Yup.string()
    .required("Không được để trống")
    .matches(/^[0-9]{10}$/, "Số điện thoại phải có 10 số"),
});
