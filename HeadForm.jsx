import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Initial values for the form
const initialValues = {
  name: "",
  age: "",
  gender: "",
  maritalStatus: "",
  occupation: "",
  qualification: "",
  samajName: "",
  birthDate: "",
  bloodGroup: "",
  duties: "",
  email: "",
  phone: "",
  altPhone: "",
  landline: "",
  socialLink: "",
  flatNo: "",
  building: "",
  street: "",
  landmark: "",
  city: "",
  district: "",
  state: "",
  nativeCity: "",
  nativeState: "",
  country: "",
  pincode: ""
};

// Yup validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  age: Yup.number().required("Required"),
  gender: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email"),
  pincode: Yup.string().required("Required")
});

function HeadForm({ onSubmit }) {
  return (
    <div>
      <h2>Head Registration Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form data", values);
          if (onSubmit) onSubmit(values);
        }}
      >
        <Form>
          <h4>Profile Summary</h4>
          <Field name="name" placeholder="Full Name" />
          <ErrorMessage name="name" component="div" />

          <Field name="age" placeholder="Age" type="number" />
          <Field name="gender" as="select">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Field>

          <Field name="maritalStatus" as="select">
            <option value="">Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </Field>

          <Field name="occupation" placeholder="Occupation" />
          <Field name="qualification" placeholder="Qualification" />
          <Field name="samajName" placeholder="Samaj Name" />

          <h4>Personal Info</h4>
          <Field name="birthDate" type="date" />
          <Field name="bloodGroup" placeholder="Blood Group" />
          <Field name="duties" placeholder="Exact Nature of Duties" />

          <h4>Contact Info</h4>
          <Field name="phone" placeholder="Phone Number" />
          <ErrorMessage name="phone" component="div" />

          <Field name="altPhone" placeholder="Alternative Number" />
          <Field name="landline" placeholder="Landline" />
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" />
          <Field name="socialLink" placeholder="Social Media Link" />

          <h4>Address</h4>
          <Field name="flatNo" placeholder="Flat No" />
          <Field name="building" placeholder="Building Name" />
          <Field name="street" placeholder="Street" />
          <Field name="landmark" placeholder="Landmark" />
          <Field name="city" placeholder="City" />
          <Field name="district" placeholder="District" />
          <Field name="state" placeholder="State" />
          <Field name="nativeCity" placeholder="Native City" />
          <Field name="nativeState" placeholder="Native State" />
          <Field name="country" placeholder="Country" />
          <Field name="pincode" placeholder="Pincode" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default HeadForm;
