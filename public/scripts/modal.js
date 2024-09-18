export function showLogOutModal() {
  document.getElementById('logOutModal').style.display = 'block';
  document.getElementById('modalBackdrop').style.display = 'block';
}

export function closeModal() {
  document.getElementById('logOutModal').style.display = 'none';
  document.getElementById('deleteMessageModal').style.display = 'none';
  document.getElementById('modalBackdrop').style.display = 'none';
}

export function showDeleteMessageModal(messageId) {
  const messageIdInput = document.getElementById('messageIdInput');
  messageIdInput.value = messageId;

  document.getElementById('deleteMessageModal').style.display = 'block';
  document.getElementById('modalBackdrop').style.display = 'block';
}
