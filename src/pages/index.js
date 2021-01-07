import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {validationConfig, initialCards} from '../utils/Constants.js';
import './index.css';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {editButton, addButton, nameField, professionField, profileForm, cardForm} from '../utils/Constants.js'



const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

const userData = new UserInfo({nameSelector: '.profile__title',
 professionSelector: '.profile__subtitle'});

const popupWithProfile = new PopupWithForm({popupSelector: '.popup_profile',
 handlerSubmit: item => {
  userData.setUserInfo(item)
}});  
popupWithProfile.setEventListeners();


const popupCreateCard = new PopupWithForm({popupSelector: '.popup_card',
handlerSubmit: (item) => {
  const card = newCard(item);
  cardSection.addItem(card);
}})
popupCreateCard.setEventListeners();

const cardSection = new Section({items: initialCards, renderer: (item) => {
  const card = newCard(item);
  cardSection.addItem(card);
}}, '.photos')

cardSection.setItems();


function newCard(item) {
  const card = new Card ({title: item.name, link: item.link, handleCardClick: () => {
    popupWithImage.open(item);
  }}, '#card-template')
  const generatedCard = card.createCard();
  return generatedCard;
}

function showPopupProfile() {
  const user = userData.getUserInfo();
  nameField.value = user.name;
  professionField.value = user.profession;
  ProfileValidation.setButtonStateActive();
  ProfileValidation.clearErrors();
  popupWithProfile.open();
};

function showPopupCard() {
  popupCreateCard.open();
};


const ProfileValidation = new FormValidator(profileForm, validationConfig);
const CardValidation = new FormValidator(cardForm, validationConfig);

ProfileValidation.enableValidation();
CardValidation.enableValidation();


addButton.addEventListener('click', showPopupCard);

editButton.addEventListener('click', showPopupProfile);

//closeButtonProfile.addEventListener('click', () => closePopup(popupProfile));

//closeButtonImage.addEventListener('click', () => closePopup(popupImage));

//profileForm.addEventListener('submit', profileFormSubmit);

//cardForm.addEventListener('submit', cardFormSubmit);

//document.addEventListener('click', popupCloseByClick);

