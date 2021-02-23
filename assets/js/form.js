const name = document.querySelector('[data-type="name"]');
const phone = document.querySelector('[data-type="phone"]');
const email = document.querySelector('[data-type="email"]');

const nameValidReg = /^[А-яA-z]+$/gm;
const phoneValidReg = /\+7\([0-9]{3,3}\)[0-9]{3,3}-[0-9]{4,4}/gm;
const emailValidReg = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z]{2,5}$/gm;

const sendBtn = document.querySelector('[data-type="send"]');

sendBtn.addEventListener('click', (event) => {
  if (!name.value.match(nameValidReg)) {
    name.style.border = '1px solid red'
  } else {
    name.style.border = null
  }

  if (!phone.value.match(phoneValidReg)) {
    phone.style.border = '1px solid red'
  } else {
    phone.style.border = null
  }

  if (!email.value.match(emailValidReg)) {
    email.style.border = '1px solid red'
  } else {
    email.style.border = null
  }
})


