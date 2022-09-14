// підключаємо бібліотеку тротл
let throttle = require('lodash.throttle');

// змінна для ключа в localStorage
const STORAGE_KEY = 'feedback-form-state';
// знаходимо форму
const el = {
  form: document.querySelector('.feedback-form'),
};
// вішаємо слухача на форму для події сабміт і інпут
el.form.addEventListener('submit', onFormSubmit);
el.form.addEventListener('input', throttle(onTextareaEmailInput, 500));

populateTextarea();

// фукція для сабміту: прибираємо дію браузера по замовчуванню, консолимо дані, після цього видаляємо дані з локального сховища і очищаємо всі форми
function onFormSubmit(evt) {
  evt.preventDefault();

  console.log(localStorage.getItem(STORAGE_KEY));

  localStorage.removeItem(STORAGE_KEY);
  evt.currentTarget.reset();
}

//функція для того, щоб дані з інпутів записувалися в локальне сховище
function onTextareaEmailInput() {
  let message = el.form.message.value;
  let email = el.form.email.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, message }));
}

// функція, якщо в локальному сховищі щось було, то вона бере дані з об'єкта з локального сховища, і розбиває на окремі ключі і заповнює ними інпути, коли ми перезавантажуємо сторінку
function populateTextarea() {
  if (localStorage.getItem(STORAGE_KEY)) {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));

    for (let key in data) {
      el.form[key].value = data[key];
    }
  }
}

// ! Інший варіант
// import Throttle from 'lodash.throttle';
// const form = document.querySelector('.feedback-form');
// const email = form.querySelector('[name="email"]');
// const message = form.querySelector('[name="message"]');
// const localKey = 'feedback-form-state';
// form.addEventListener('input', Throttle(storageFormData, 500));
// form.addEventListener('submit', onFormSubmit);
// function onFormSubmit(event) {
//   event.preventDefault();
//   // const { email, message } = event.currentTarget.elements;
//   // вывести в консоль в1
//   //   console.log({ email: email.value, message: message.value });
//   // вывести в консоль в2
//   const savedData = JSON.parse(localStorage.getItem(localKey));
//   console.dir(savedData);
//   localStorage.removeItem(localKey);
//   event.currentTarget.reset();
// }
// function storageFormData(event) {
//   const formValue = { email: '', message: '' };
//   if (localStorage.getItem(localKey)) {
//     Object.assign(formValue, JSON.parse(localStorage.getItem(localKey)));
//   }
//   //   console.log('name input:', event.target.name);
//   //   console.log('value input:', event.target.value);
//   formValue[event.target.name] = event.target.value;
//   //   console.log(formValue);
//   localStorage.setItem(localKey, JSON.stringify(formValue));
// }
