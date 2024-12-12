import React, { useState } from 'react';
import { Formik, Form, FieldArray, Field } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../../Components/Common/CustomFormField/CustomInput';
import CustomPopover from '../../Components/Common/CustomPopover';
import CheckboxGroup from '../../Components/Common/test/CheckboxGroup';
import CustomCheckbox from '../../Components/Common/CustomFormField/CustomCheckbox';
import CustomSearchInput from '../../Components/Common/CustomFormField/CustomSearchInput';
import CustomSelect from '../../Components/Common/CustomSelect';
import GridItem from '../../Components/Common/CustomCard/GridItem';
import TableRow from '../../Components/Common/CustomCard/TableRow';

const validationSchema = Yup.object({
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required('Password is required'),
  msg: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(540, "Message cannot exceed 540 characters")
    .required('Message is required'),
    agree: Yup.boolean()
    .required('You must agree to the terms')
    .oneOf([true], 'You must agree to the terms'),
  groups: Yup.array().of(
    Yup.object({
      checkboxes: Yup.array().of(
        Yup.object({
          label: Yup.string().required(),
          isSelected: Yup.boolean().required(),
        })
      ).required(),
      selectAll: Yup.boolean(),
    })
  ).required(),
  selectedOptions: Yup.array().min(1, "Select at least one option").required("Selection is required"),
});

const initialValues = {
  password: '',
  msg: '',
  agree:false,
  groups: [
    { checkboxes: [{ label: 'Item 1', isSelected: false }, { label: 'Item 2', isSelected: false }, { label: 'Item 3', isSelected: false }], selectAll: false },
  ],
  selectedOptions: []
};

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
  { value: 'option6', label: 'Option 6' },
  { value: 'option7', label: 'Option 7' },
];

function ManageOrders() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value) => {
    setSearchValue(value);
    // Handle the search logic here
  };

  const handleClear = () => {
    // Handle additional clear logic if needed
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  const handleSelectChange = (selectedOptions, setFieldValue) => {
    setFieldValue("selectedOptions", selectedOptions);
    console.log('Selected options:', selectedOptions);
  };

  return (
    <div className=' py-4  mx-auto container my-6 bg-glassl dark:bg-glassd backdrop-blur-sm px-4 rounded-xl flex justify-center items-center gap-8'>

      <div className="card h-[800px] w-full">
        <GridItem />
        <br /><hr /> <br />
        <TableRow />
        <br /><hr />
      </div>
      <hr />
      <div className="h-[400px mt-8" >
        <CustomPopover
          popOverTrigger={<button className="btn text-3xl text-bold font-satoshi bg-glassl dark:bg-glassd rounded-xl shadow-2xl p-2 text-gray-800 dark:text-white">Log in</button>}
          popOverContent={
            <div className='min-h-96 h-[300px] w-[500px]'>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {formik => (
                  <Form>
                    <CustomSearchInput
                      filterValue={searchValue}
                      setFilterValue={setSearchValue}
                      onSearchChange={handleSearchChange}
                      onClear={handleClear}
                    />
                    <CustomInput
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      isRequired={true}
                      minLength={4}
                    />
                    <CustomInput
                      label="Message"
                      name="msg"
                      type="textarea"
                      placeholder="Enter your message"
                      isRequired={true}
                      minLength={10}
                      maxLength={540}
                    />
                    <CustomInput
                      label="Agree to terms"
                      name="agree"
                      type="checkbox"
                      isRequired={true}
                    />

                    <CustomSelect
                      label="Choose an Option"
                      options={options}
                      defaultValue={formik.values.selectedOptions}
                      width="300px"
                      isMulti={true}
                      searchable={true}
                      onChange={(selectedOptions) => handleSelectChange(selectedOptions, formik.setFieldValue)}
                    />
                    <FieldArray
                      name="groups"
                      render={() => (
                        <>
                          {formik.values.groups.map((group, index) => (
                            <CheckboxGroup
                              key={index + 1}
                              groupIndex={index}
                              groupLabel={"Group Checkboxes"}
                              checkboxes={group.checkboxes}
                            />
                          ))}
                        </>
                      )}
                    />
                    <button
                      type="submit"
                      disabled={formik.isSubmitting}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          }
          popoverTitle={<span>Title</span>}
          closeArrow={true}
          popOverContentPlacement="bottom"
        />
      </div>
    </div>
  );
}

export default ManageOrders;
