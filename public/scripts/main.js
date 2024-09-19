import {
  showLogOutModal,
  closeModal,
  showDeleteMessageModal,
} from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
  const openLogOutModalButton = document.querySelector(
    '#openLogOutModalButton'
  );

  if (openLogOutModalButton) {
    openLogOutModalButton.addEventListener('click', showLogOutModal);
  }

  document.querySelectorAll('.close-btn').forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  document
    .querySelector('#modalBackdrop')
    .addEventListener('click', closeModal);
});

// put this in the validators util?
