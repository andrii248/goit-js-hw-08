const throttle = require('lodash.throttle');

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};

console.log(refs.email);
console.log(refs.message);
console.log(refs.form);

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInputValues, 500));

const inputValues = localStorage.getItem('feedback-form-state')
  ? JSON.parse(localStorage.getItem('feedback-form-state'))
  : {};

onSavedInput();

function onInputValues(e) {
  inputValues[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(inputValues));
}

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}

function onSavedInput(e) {
  if (!localStorage.getItem('feedback-form-state')) {
    return;
  }
  const savedInput = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (savedInput) {
    refs.email.value = inputValues.email ? inputValues.email : '';
    refs.message.value = inputValues.message ? inputValues.message : '';
  }
}
