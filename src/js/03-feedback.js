import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmit);

function onInput(evt) {
  const storage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  const formData = { ...storage, [evt.target.name]: evt.target.value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onReloadPage() {
  const { email, message } = form.elements;
  const storage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (storage) {
    email.value = storage.email || '';
    message.value = storage.message || '';
  }
}

onReloadPage();

function onSubmit(evt) {
  evt.preventDefault();

  const {
    elements: { email, message },
  } = evt.currentTarget;

  const data = { email: email.value, message: message.value };
  console.log(data);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
