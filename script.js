const modal = document.querySelector('#modal');
const content = document.querySelector('#content');
const opener = document.querySelector('#open');
const fix = document.querySelector('#fix');
const form = document.querySelector('#form');
const toast = document.querySelector('#toast');
let timer;

function openModal() {
  modal.hidden = false;
  document.body.classList.add('modal-open');
  toast.hidden = true;
  document.querySelector('#name').focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  opener.focus();
}

opener.addEventListener('click', openModal);
document.querySelector('.close').addEventListener('click', closeModal);
document.querySelector('#cancel').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

fix.addEventListener('change', () => {
  (fix.checked ? document.body : content).append(modal);
  document.querySelector('#state').textContent = fix.checked
    ? 'body → .modal · z-index: 100'
    : 'main → .modal · z-index: 999999';
  fix.focus();
});

document.addEventListener('keydown', (event) => {
  if (modal.hidden) return;
  if (event.key === 'Escape') closeModal();
  if (event.key !== 'Tab') return;
  const controls = [...modal.querySelectorAll('button, input, textarea')];
  const first = controls[0];
  const last = controls.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = {
    name: 'savedName',
    lastName: 'savedLastName',
    middleName: 'savedMiddleName',
    phone: 'savedPhone',
    email: 'savedEmail',
    about: 'savedAbout',
  };
  for (const [field, target] of Object.entries(fields)) {
    document.getElementById(target).textContent = form.elements[field].value.trim();
  }
  closeModal();
  toast.hidden = false;
  clearTimeout(timer);
  timer = setTimeout(() => { toast.hidden = true; }, 3000);
});

openModal();
