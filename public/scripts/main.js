import { openModal, closeModal } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
  const openLogOutModalButton = document.querySelector(
    '#openLogOutModalButton'
  );

  if (openLogOutModalButton) {
    openLogOutModalButton.addEventListener('click', openModal);
  }

  document.querySelectorAll('.close-btn').forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  document
    .querySelector('#modalBackdrop')
    .addEventListener('click', closeModal);

  const createMessageButton = document.querySelector('#create-message-btn');
  const formContainer = document.getElementById('send-message-form-container');
  const closeFormButton = document.getElementById('close-form-btn');

  createMessageButton.addEventListener('click', () => {
    formContainer.style.display = 'block';
    createMessageButton.style.display = 'none';
  });

  closeFormButton.addEventListener('click', function () {
    formContainer.style.display = 'none';
    createMessageButton.style.display = 'block';
  });
});
