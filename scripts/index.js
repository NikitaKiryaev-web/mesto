let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close');
let nameField = popup.querySelector('.popup__input_type_name');
let professionField = popup.querySelector('.popup__input_type_profession');
let saveButton = popup.querySelector('.popup__save-button');
let nameTitle = document.querySelector('.profile__title');
let professionTitle = document.querySelector('.profile__subtitle');
let form = document.querySelector('.popup__form');


function showPopup() {
  popup.classList.add('popup__opened')
  nameField.value = nameTitle.textContent;
  professionField.value = professionTitle.textContent;
};

function closePopup() {
  popup.classList.remove('popup__opened')
};

function formSubmit(event) {
  event.preventDefault();
  nameTitle.textContent = nameField.value;
  professionTitle.textContent = professionField.value;
  closePopup();
}

editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmit);


