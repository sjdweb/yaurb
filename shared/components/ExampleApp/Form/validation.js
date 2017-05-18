import { SubmissionError } from 'redux-form';

const requiredField = key => (vals) => {
  if (!vals[key]) {
    return { key, error: 'Required field' };
  }
  return null;
};

const ruleMappings = {
  required: requiredField,
};

const parseRules = rules => rules.map(r => (ruleMappings[r.is](r.field) || null));

const validate = (rules, onSubmit) => (values) => {
  const errors = rules.map(r => r(values)).filter(e => e !== null);

  if (errors.length > 0) {
    const errorMap = errors.reduce((a, b) => {
      a[b.key] = b.error;
      return a;
    }, {});
    throw new SubmissionError(Object.assign({}, errorMap, { _error: 'Failed to submit' }));
  }

  return onSubmit(values);
};

export default (rules, onSubmit) => validate(parseRules(rules), onSubmit);
