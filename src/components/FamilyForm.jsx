import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

const memberSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  age: Yup.number().required("Required"),
  gender: Yup.string().required("Required"),
  relation: Yup.string().required("Required"),
  phone: Yup.string().required("Required")
});

const validationSchema = Yup.object().shape({
  familyMembers: Yup.array().of(memberSchema)
});

const initialValues = {
  familyMembers: [
    {
      firstName: "",
      middleName: "",
      lastName: "",
      birthDate: "",
      age: "",
      gender: "",
      maritalStatus: "",
      qualification: "",
      occupation: "",
      duties: "",
      bloodGroup: "",
      photo: "",
      relation: "",
      phone: "",
      altPhone: "",
      landline: "",
      email: "",
      socialLink: "",
      country: "",
      state: "",
      district: "",
      city: "",
      street: "",
      landmark: "",
      building: "",
      doorNumber: "",
      flatNumber: "",
      pincode: "",
      nativeCity: "",
      nativeState: ""
    }
  ]
};

function FamilyForm({ onSubmit }) {
  return (
    <div>
      <h2>Family Member Registration</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Family Data", values);
          if (onSubmit) onSubmit(values.familyMembers);
        }}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="familyMembers">
              {({ push, remove }) => (
                <div>
                  {values.familyMembers.map((_, index) => (
                    <div key={index} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
                      <h4>Member {index + 1}</h4>
                      <Field name={`familyMembers[${index}].firstName`} placeholder="First Name" />
                      <ErrorMessage name={`familyMembers[${index}].firstName`} component="div" />

                      <Field name={`familyMembers[${index}].age`} placeholder="Age" />
                      <Field name={`familyMembers[${index}].gender`} as="select">
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Field>

                      <Field name={`familyMembers[${index}].relation`} placeholder="Relation with Head" />
                      <Field name={`familyMembers[${index}].phone`} placeholder="Phone Number" />
                      <button type="button" onClick={() => remove(index)}>Remove</button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      push({
                        firstName: "",
                        age: "",
                        gender: "",
                        relation: "",
                        phone: ""
                      })
                    }
                  >
                    ➕ Add Member
                  </button>
                </div>
              )}
            </FieldArray>

            <button type="submit">Submit All</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FamilyForm;
