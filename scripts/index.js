import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {validationConfig, initialCards} from './Constants.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup_profile');
const closeButtonProfile = popupProfile.querySelector('.popup__close');
const nameField = popupProfile.querySelector('.popup__input_type_name');
const professionField = popupProfile.querySelector('.popup__input_type_profession');
const nameTitle = document.querySelector('.profile__title');
const professionTitle = document.querySelector('.profile__subtitle');
const profileForm = popupProfile.querySelector('.popup__form');
const popupCard = document.querySelector('.popup_card');
const closeButtonCard = popupCard.querySelector('.popup__close');
const cardForm = popupCard.querySelector('.popup__form_card');
const photos = document.querySelector('.photos');
const titleField = popupCard.querySelector('.popup__input_type_title');
const urlField = popupCard.querySelector('.popup__input_type_url');
export const popupImage = document.querySelector('.popup_image');
const closeButtonImage = popupImage.querySelector('.popup__close');
export const popupIllustration = popupImage.querySelector('.popup__illustration');
export const popupDescription = popupImage.querySelector('.popup__description');



// Функция очистки сообщений ошибок при повторном открытии попапа
/*function clearErrors (popup) {
  const errors = Array.from(popup.querySelectorAll('.popup__error'));
  const inputs = Array.from(popup.querySelectorAll('.popup__input'));
  errors.forEach((error) => {
    error.textContent = '';
  });

  inputs.forEach((input) => {
    input.classList.remove('popup__input_type_error');
  });
}*/



// Общая функция открытия всех попапов
export function showPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', popupCloseByKeydown);
  
}



// Общая функция закрытия всех попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', popupCloseByKeydown);
}

function showPopupProfile() {
  nameField.value = nameTitle.textContent;
  professionField.value = professionTitle.textContent;
  ProfileValidation.setButtonStateActive();
  ProfileValidation.clearErrors();
  showPopup(popupProfile);
};

function showPopupCard() {
  titleField.value = '';
  urlField.value = '';
  CardValidation.setButtonStateDisabled();
  CardValidation.clearErrors();
  showPopup(popupCard);
};

 export function showPopupImage(link, name) {
  popupIllustration.src = link;
  popupIllustration.alt = name;
  popupDescription.textContent = name;  
  showPopup(popupImage);
}



function profileFormSubmit() {
  nameTitle.textContent = nameField.value;
  professionTitle.textContent = professionField.value;
  closePopup(popupProfile);
}

function cardFormSubmit() {
  
  const name = titleField.value;
  const link = urlField.value;
  const newCard = new Card(name, link, '#card-template');
  const card = newCard.createCard();
  addCard(card);
  closePopup(popupCard);
}



// Функция добавления новой карточки в разметку
function addCard (cardElement) {
  photos.prepend(cardElement);
}

function popupCloseByClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closeOpenedPopup();
  }
}

function closeOpenedPopup() {
  const openedPopup = document.querySelector('.popup_opened');
  closePopup(openedPopup);
}

function popupCloseByKeydown (evt) {
  if (evt.key === 'Escape') {
    closeOpenedPopup();
  }
}

initialCards.forEach((item) => {
  const newCard = new Card(item.name, item.link, '#card-template');
  const cardElement = newCard.createCard();
  addCard(cardElement);  
});

const ProfileValidation = new FormValidator(profileForm, validationConfig);
const CardValidation = new FormValidator(cardForm, validationConfig);

ProfileValidation.enableValidation();
CardValidation.enableValidation();


addButton.addEventListener('click', showPopupCard);

editButton.addEventListener('click', showPopupProfile);

closeButtonCard.addEventListener('click', () => closePopup(popupCard));

closeButtonProfile.addEventListener('click', () => closePopup(popupProfile));

closeButtonImage.addEventListener('click', () => closePopup(popupImage));

profileForm.addEventListener('submit', profileFormSubmit);

cardForm.addEventListener('submit', cardFormSubmit);

document.addEventListener('click', popupCloseByClick);

