import React from 'react';
import { Field, useFormikContext } from 'formik';
import CustomCheckbox from '../CustomFormField/CustomCheckbox';

const CheckboxGroup = ({ groupIndex, groupLabel }) => {
  const { setFieldValue, values } = useFormikContext();
  const group = values.groups[groupIndex] || { checkboxes: [], selectAll: false };

  // Handle the "Select All" checkbox toggle for this group
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const updatedCheckboxes = group.checkboxes.map(cb => ({ ...cb, isSelected: isChecked }));
    setFieldValue(`groups.${groupIndex}.checkboxes`, updatedCheckboxes);
    setFieldValue(`groups.${groupIndex}.selectAll`, isChecked);
  };

  // Handle individual checkbox change
  const handleCheckboxChange = (index) => (e) => {
    const updatedCheckboxes = group.checkboxes.map((cb, i) =>
      i === index ? { ...cb, isSelected: e.target.checked } : cb
    );
    setFieldValue(`groups.${groupIndex}.checkboxes`, updatedCheckboxes);

    // Update selectAll status based on individual checkboxes
    const allChecked = updatedCheckboxes.every(cb => cb.isSelected);
    setFieldValue(`groups.${groupIndex}.selectAll`, allChecked);
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
        checked={group.selectAll}
      />
      {group.checkboxes.map((cb, index) => (
     <div className="pl-4">
         <Field
          key={index}
          type="checkbox"
          name={`groups.${groupIndex}.checkboxes[${index}].isSelected`}
          as={CustomCheckbox}
          label={cb.label}
          onChange={handleCheckboxChange(index)}
          checked={cb.isSelected}
        />
     </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
