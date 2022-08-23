import * as Yup from "yup";

const nameRegExp = new RegExp("^[A-Z][a-z]*( [A-Z][a-z]*)*$");
const phoneRegExp = new RegExp("^[6-9]{1}[)]?[0-9]{9}$");
const emailRegExp = new RegExp("^[a-z][a-z0-9]+@[a-z]+.[a-z]+.[a-z]{2,3}$");

const pincodeRegExp = new RegExp("^[1-9][0-9]{5}$");

export const signupSchema = Yup.object({
  name: Yup.string()
    .matches(nameRegExp, "enter a valid name")
    .required("Please enter your name"),

  phone: Yup.string()
    .matches(phoneRegExp, "enter valid phone number")
    .required("Please enter Phone Number"),
  email: Yup.string()
    .matches(emailRegExp, "enter valid  email")
    
    .required("Please enter your email."),
  password: Yup.string()
    .min(5)
    .required("Password must be at least 5 characters.")

    .required("Please enter your password."),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match!")
    .required("Please enter confirm password."),
  pincode: Yup.string()
    .matches(pincodeRegExp, "enter valid pincode number")
    .required("Please enter Pincode"),
  address: Yup.string()
  .required("Please enter address"),
});
