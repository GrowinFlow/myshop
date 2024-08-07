import React from 'react';
import { Field, useFormikContext } from 'formik';
import CustomCheckbox from '../CustomFormField/CustomCheckbox';

const CheckboxGroup = ({ groupIndex, groupLabel, checkboxes }) => {
  const { setFieldValue } = useFormikContext();

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setFieldValue(`groups.${groupIndex}.checkboxes`, checkboxes.map(cb => ({ ...cb, isSelected: isChecked })));
  };

  const handleCheckboxChange = (index) => (e) => {
    const updatedCheckboxes = checkboxes.map((cb, i) =>
      i === index ? { ...cb, isSelected: e.target.checked } : cb
    );
    setFieldValue(`groups.${groupIndex}.checkboxes`, updatedCheckboxes);
  };

  return (
    <div className="mb-4">
      <div className="font-semibold text-lg mb-2">{groupLabel}</div>
      <Field
        type="checkbox"
        name={`groups.${groupIndex}.selectAll`}
        as={CustomCheckbox}
        label="Select All"
        onChange={handleSelectAll}
      />
      {checkboxes.map((cb, index) => (
        <Field
          key={index}
          type="checkbox"
          name={`groups.${groupIndex}.checkboxes[${index}]`}
          as={CustomCheckbox}
          label={cb.label}
          checked={cb.isSelected}
          onChange={handleCheckboxChange(index)}
        />
      ))}
    </div>
  );
};

export default CheckboxGroup;
