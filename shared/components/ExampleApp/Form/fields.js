import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Field } from 'redux-form';

export const renderField = ({ input, label, type, meta: { touched, error } }) => {
  const InputField = type === 'textarea' ? 'textarea' : 'input';
  return (
    <div>
      <label htmlFor={input.name}>{label}</label>
      <div>
        <InputField {...input} type={type} placeholder={label} />
        {touched && error && <span className="form-field-error">{error}</span>}
      </div>
    </div>
  );
};

renderField.propTypes = {
  input: PropTypes.objectOf(Object).isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  meta: PropTypes.objectOf(Object).isRequired,
};

renderField.defaultProps = {
  label: '',
};

export const multiItemList = ({ fields, meta: { touched, error }, fieldKey, fieldLabel }) => (
  <ul>
    {fields.map((item, index) =>
      <li key={`field_${item}_${fieldKey}`}>
        <div className="row">
          <div className="column column-90">

            <Field
              name={`${item}.${fieldKey}`}
              type="text"
              component={renderField}
              placeholder={fieldLabel}
            />
          </div>
          <div className="column column-10">
            <FontAwesome name="trash-o" title={`Remove ${fieldLabel}`} onClick={() => fields.remove(index)} />
          </div>
        </div>
      </li>,
    )}
    <li>
      <button type="button" onClick={() => fields.push({})}>Add Duty</button>
      {touched && error && <span>{error}</span>}
    </li>
  </ul>
);

multiItemList.propTypes = {
  fields: PropTypes.objectOf(Object).isRequired,
  meta: PropTypes.objectOf(Object).isRequired,
  fieldKey: PropTypes.string.isRequired,
  fieldLabel: PropTypes.string.isRequired,
};
