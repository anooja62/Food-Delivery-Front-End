import * as Yup from "yup";


const nameRegExp = new RegExp(
    "^[A-Z][a-z]*( [A-Z][a-z]*)*$"
);
const phoneRegExp = new RegExp(
    "^[6-9]{3}[)]?[0-9]{3}[0-9]{4,6}$"
);



export const signupSchema = Yup.object({
    name: Yup.string()
         .matches(nameRegExp ,"enter a valid name")
         .required("Please enter your name"),
            
    phone: Yup.string()
         .matches(phoneRegExp,'enter valid phone numbers')
         .required("Please enter Phone Number"),
    email: Yup.string()
        .email("Please enter valid email.")
        .required("Please enter your email."),
    password: Yup.string().min(5).required("Password must be at least 5 characters.")
        
        .required("Please enter your password."),
    cpassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match!")
        .required("Please enter confirm password."),
        
});