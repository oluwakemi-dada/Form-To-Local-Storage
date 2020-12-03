const firstnameEl = document.querySelector('.firstname');
const lastnameEl = document.querySelector('.lastname');
const emailEl = document.querySelector('.email');
const phoneNoEl = document.querySelector('.phone-no');
const messageEl = document.querySelector('.message');
const submitBtn = document.querySelector('.submit');
const viewFormBtn = document.querySelector('.view-form');
const contact = document.querySelector('.contact');
const form = document.querySelector('.form');
const formHeading = document.querySelector('.form-heading');
const enquiries = document.querySelector('.enquiries');
const back = document.querySelector('.back');
const footer = document.querySelector('footer');

// GET FORM FROM LOCAL STORAGE
const getFormFromLocalStorage = () => {
  let formInfo;

  if (localStorage.getItem('formInfo') === null) {
    formInfo = [];
  } else {
    formInfo = JSON.parse(localStorage.getItem('formInfo'));
  }
  return formInfo;
};

// STORE FORM IN LOCAL STORAGE
const storeFormInLocalStorage = (info) => {
  const formInfo = getFormFromLocalStorage();

  formInfo.push(info);
  localStorage.setItem('formInfo', JSON.stringify(formInfo));
};

// DISPLAY FORM FROM LOCAL STORAGE
const displayFormFromLocalStorage = () => {
  const formInfo = getFormFromLocalStorage();
  form.textContent = '';
  enquiries.style.display = 'none';
  footer.style.display = 'none';
  form.className = 'form form-details';
  formHeading.textContent = 'Form Details';

  let output = '';
  formInfo.forEach((currFormInfo) => {
    output += `
      <div class='form-output'>
        <p>Firstname: ${currFormInfo.firstname}</p>
        <p>Lastname: ${currFormInfo.lastname}</p>
        <p>Email: ${currFormInfo.email}</p>
        <p>Phone Number: ${currFormInfo.phoneNo}</p>
        <p>Message: ${currFormInfo.message}</p>
      </div>
    `;
  });
  form.innerHTML = output;
  const backBtn = `
    <button class="back back-btn">&larr; Back</button>
  `;
  back.innerHTML = backBtn;
};

// CLEAR ALERT
const clearAlert = () => {
  const currentAlert = document.querySelector('.alert');
  if (currentAlert) {
    currentAlert.remove();
  }
};

// SHOW MESSAGE
const showMessage = (className, message) => {
  clearAlert();
  const div = document.createElement('div');
  div.className = className;
  div.appendChild(document.createTextNode(message));
  contact.insertBefore(div, form);
  setTimeout(() => {
    clearAlert();
  }, 3000);
};

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const formValues = {
    firstname: firstnameEl.value,
    lastname: lastnameEl.value,
    email: emailEl.value,
    phoneNo: phoneNoEl.value,
    message: messageEl.value,
  };

  if (
    formValues.firstname !== '' &&
    formValues.lastname !== '' &&
    formValues.email !== '' &&
    formValues.phoneNo !== null &&
    formValues.message !== ''
  ) {
    showMessage('alert success', 'Form submitted');
    storeFormInLocalStorage(formValues);
    firstnameEl.value = '';
    lastnameEl.value = '';
    emailEl.value = '';
    phoneNoEl.value = null;
    messageEl.value = '';
  } else {
    showMessage('alert error', 'Fill all fields');
  }
});

viewFormBtn.addEventListener('click', displayFormFromLocalStorage);

back.addEventListener('click', (e) => {
  if (e.target.classList.contains('back-btn')) {
    console.log(e.target);
    window.location.reload();
  }
});

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
