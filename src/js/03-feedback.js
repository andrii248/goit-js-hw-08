// ============== Solution 1 =============

// const throttle = require('lodash.throttle');

// const refs = {
//   form: document.querySelector('.feedback-form'),
// };

// const STORAGE_KEY = 'feedback-form-state';

// // console.log(refs.email);
// // console.log(refs.message);
// console.log(refs.form);

// refs.form.addEventListener('submit', onFormSubmit);
// refs.form.addEventListener('input', throttle(onInputValues, 500));

// onSavedInput();

// function onInputValues(e) {
//   const inputData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

//   if (e.target.name === 'email') {
//     inputData.email = e.target.value;
//   } else if (e.target.name === 'message') {
//     inputData.message = e.target.value;
//   }

//   localStorage.setItem(STORAGE_KEY, JSON.stringify(inputData));
// }

// function onFormSubmit(e) {
//   e.preventDefault();

//   const email = refs.form.elements.email.value;
//   const message = refs.form.elements.message.value;

//   if (!email || !message) {
//     return alert('Some field(s) still empty');
//   }

//   refs.form.reset();
//   localStorage.removeItem(STORAGE_KEY);
// }

// function onSavedInput(e) {
//   const savedInput = JSON.parse(localStorage.getItem(STORAGE_KEY));
//   if (savedInput) {
//     refs.form.elements.email.value = savedInput.email || '';
//     refs.form.elements.message.value = savedInput.message || '';
//   }
// }

// ============== Solution 2 =============

const throttle = require('lodash.throttle');

const refs = {
  form: document.querySelector('.feedback-form'),
};

const STORAGE_KEY = 'feedback-form-state';

console.log(refs.form);

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInputValues, 500));

const inputValues = localStorage.getItem(STORAGE_KEY)
  ? JSON.parse(localStorage.getItem(STORAGE_KEY))
  : {};

onSavedInput();

function onInputValues(e) {
  const inputData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  if (e.target.name === 'email') {
    inputData.email = e.target.value;
  } else if (e.target.name === 'message') {
    inputData.message = e.target.value;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(inputData));
}

function onFormSubmit(e) {
  e.preventDefault();

  const email = refs.form.elements.email.value;
  const message = refs.form.elements.message.value;
  if (!email || !message) return alert('Some field(s) still empty');

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onSavedInput(e) {
  if (!localStorage.getItem(STORAGE_KEY)) {
    return;
  }
  const savedInput = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedInput) {
    refs.form.elements.email.value = inputValues.email ? inputValues.email : '';
    refs.form.elements.message.value = inputValues.message ? inputValues.message : '';
  }
}
