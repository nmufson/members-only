import { showDeleteMessageModal } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sendMessageForm');
  const closeFormButton = document.getElementById('closeFormBtn');
  const createMessageButton = document.querySelector('#createMessageBtn');

  if (createMessageButton) {
    createMessageButton.addEventListener('click', () => {
      form.style.display = 'block';
      createMessageButton.style.display = 'none';
    });
  }

  if (closeFormButton) {
    closeFormButton.addEventListener('click', function () {
      form.style.display = 'none';
      createMessageButton.style.display = 'block';
    });
  }

  const deleteMessageIcons = document.querySelectorAll('.delete-icon');

  deleteMessageIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
      const messageId = icon.id;
      showDeleteMessageModal(messageId);
    });
  });

  const textarea = form.querySelector('textarea[name="message"]');
  const submitButton = form.querySelector('button[type="submit"]');
  const formActionsDiv = form.querySelector('#messageFormActions');
  const feedback = document.createElement('p');
  const rootStyles = getComputedStyle(document.documentElement);
  feedback.className = 'message-feedback';
  textarea.parentElement.insertBefore(feedback, formActionsDiv);
  submitButton.disabled = true;

  textarea.addEventListener('input', () => {
    const maxLength = 250;
    const currentLength = textarea.value.length;

    if (currentLength === 0) {
      feedback.textContent = `Message cannot be empty.`;
      feedback.style.color = 'red';
      submitButton.disabled = true;
    } else {
      feedback.textContent = `${currentLength}/${maxLength} characters`;
      const textColor = rootStyles.getPropertyValue('--text-color').trim();
      feedback.style.color = textColor;
      submitButton.disabled = false;
    }
  });
});
