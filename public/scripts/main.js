import { openModal, closeModal } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
  const openLogOutModalButton = document.querySelector('#openLogOutModal');

  if (openLogOutModalButton) {
    openLogOutModalButton.addEventListener('click', openModal);
  }

  document.querySelectorAll('.close-btn').forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  document
    .querySelector('#modalBackdrop')
    .addEventListener('click', closeModal);
});
