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
