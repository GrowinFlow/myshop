import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../../Components/Common/CustomFormField/CustomInput';
import CustomPopover from '../../Components/Common/CustomPopover';
import CustomCheckbox from '../../Components/Common/CustomFormField/CustomCheckbox';

import CheckboxGroup from '../../Components/Common/test/CheckboxGroup';

const validationSchema = Yup.object({
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required('Password is required'),
  msg: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(540, "Message cannot exceed 540 characters")
    .required('Message is required'),
 groups: Yup.array().of(
    Yup.object({
      checkboxes: Yup.array().of(
        Yup.object({
          label: Yup.string().required(),
          isSelected: Yup.boolean().required()
        })
      ).required()
    })
  ).required()
});

const initialValues = {
  groups: [
    { checkboxes: [{ label: 'Item 1', isSelected: false }, { label: 'Item 2', isSelected: false }, { label: 'Item 3', isSelected: false }], selectAll: false },
    { checkboxes: [{ label: 'Item 4', isSelected: false }, { label: 'Item 5', isSelected: false }, { label: 'Item 6', isSelected: false }], selectAll: false },
    { checkboxes: [{ label: 'Item 7', isSelected: false }, { label: 'Item 8', isSelected: false }, { label: 'Item 9', isSelected: false }], selectAll: false },
  ]
};

function ManageOrders() {
  const initialValues = {
    password: '',
    msg: '',
    items: [],
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  return (
    <>
    <div className="p-8 py-4 h-[800px] mx-auto container my-6 bg-glassl dark:bg-glassd backdrop-blur-sm px-4 rounded-xl">
      <CustomPopover
        popOverTrigger={<button className="btn">Log in</button>}
        popOverContent={<div className='min-h-96 h-[300px] w-[500px]'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <CustomInput
                  label="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  isRequired={true}
                  minLength={4}
                />
                <CustomInput
                  label="msg"
                  name="msg"
                  type="textarea"
                  placeholder="Enter your message"
                  isRequired={true}
                  minLength={10}
                  maxLength={540}
                />
     {initialValues.groups.map((group, index) => (
            <CheckboxGroup
              key={index}
              groupIndex={index}
              groupLabel={`Group ${index + 1}`}
              checkboxes={group.checkboxes}
            />
          ))}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>}
        popoverTitle={<span> Title</span>}
        closeArrow={true}
        popOverContentPlacement="bottom"
      />
    </div>
    
    </>
  );
};

export default ManageOrders;
