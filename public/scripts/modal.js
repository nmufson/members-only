export function openModal() {
  document.getElementById('logOutModal').classList.add('show');
  document.getElementById('modalBackdrop').classList.add('show');
}

export function closeModal() {
  document.getElementById('logOutModal').classList.remove('show');
  document.getElementById('modalBackdrop').classList.remove('show');
}
