export function openModal() {
  document.getElementById('logOutModal').classList.add('show');
  document.getElementById('modalBackdrop').classList.add('show');
}

export function closeModal() {
  const deleteModal = document.getElementById('deleteMessageModal');
  document.getElementById('logOutModal').classList.remove('show');
  deleteModal.style.display = 'none';
  document.getElementById('modalBackdrop').classList.remove('show');
}

export function showDeleteModal(messageId) {
  const deleteModal = document.getElementById('deleteMessageModal');
  const messageIdInput = document.getElementById('messageIdInput');
  messageIdInput.value = messageId;

  deleteModal.style.display = 'block';
  document.getElementById('modalBackdrop').classList.add('show');
}
