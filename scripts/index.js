const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_profile');
const closeButtonProfile = popupProfile.querySelector('.popup__close');
const nameField = popup.querySelector('.popup__input_type_name');
const professionField = popup.querySelector('.popup__input_type_profession');
const saveButton = popup.querySelector('.popup__save-button');
const nameTitle = document.querySelector('.profile__title');
const professionTitle = document.querySelector('.profile__subtitle');
const profileForm = popupProfile.querySelector('.popup__form');
const popupCard = document.querySelector('.popup_card');
const closeButtonCard = popupCard.querySelector('.popup__close');
const cardForm = popupCard.querySelector('.popup__form_card');
const photos = document.querySelector('.photos');
const titleField = popupCard.querySelector('.popup__input_type_title');
const urlField = popupCard.querySelector('.popup__input_type_url');
const popupImage = document.querySelector('.popup_image');
const closeButtonImage = popupImage.querySelector('.popup__close');
const popupImageContainer = popupImage.querySelector('.popup__container');
let popupIllustration = popupImage.querySelector('.popup__illustration');
let popupDescription = popupImage.querySelector('.popup__description');
const photosCard = photos.querySelector('.photos__card');

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Функция очистки сообщений ошибок при повторном открытии попапа
function clearErrors (popup) {
  const errors = popup.querySelectorAll('.popup__error');
  const inputs = popup.querySelectorAll('.popup__input');
  errors.forEach((error) => {
    error.textContent = '';
  });

  inputs.forEach((input) => {
    input.classList.remove('popup__input_type_error');
  });
}

// Общая функция открытия всех попапов
function showPopup(popup) {
  popup.classList.add('popup_opened');
  clearErrors(popup);
}

// Общая функция закрытия всех попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function showPopupProfile() {
  nameField.value = nameTitle.textContent;
  professionField.value = professionTitle.textContent;
  showPopup(popupProfile);
};

function showPopupCard() {
  titleField.value = '';
  urlField.value = '';
  showPopup(popupCard);
};

function showPopupImage(link, name) {
  popupIllustration.src = link;
  popupIllustration.alt = name;
  popupDescription.textContent = name;  
  showPopup(popupImage);
}



function profileFormSubmit(event) {
  event.preventDefault();
  nameTitle.textContent = nameField.value;
  professionTitle.textContent = professionField.value;
  closePopup(popupProfile);
}

function cardFormSubmit(event) {
  event.preventDefault();
  const name = titleField.value;
  const link = urlField.value;
  
  pushCard(addCard(name, link));

  closePopup(popupCard);
}


function deleteCard(event) {
  event.target.closest('.photos__card').remove();
}


function addLike(event) {
  event.target.classList.toggle('photos__like-button_active'); 
}

// Функция инициализации новой карточки
function addCard (imageName, imageLink) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const photosIllustration = cardElement.querySelector('.photos__illustration');
  const photosTitle = cardElement.querySelector('.photos__title');
  const photosDeleteButton = cardElement.querySelector('.photos__delete-button');
  const photosLikeButton = cardElement.querySelector('.photos__like-button');
  
  photosIllustration.src = imageLink;

  photosIllustration.alt = imageName;

  photosIllustration.addEventListener('click', () => showPopupImage(imageLink, imageName));

  photosTitle.textContent = imageName;

  photosDeleteButton.addEventListener('click', deleteCard);

  photosLikeButton.addEventListener('click', addLike);

  return cardElement;
}

// Функция добавления новой карточки в разметку
function pushCard (cardElement) {
  photos.prepend(cardElement);
}

initialCards.forEach((item) => pushCard(addCard(item.name, item.link)));




addButton.addEventListener('click', showPopupCard);

editButton.addEventListener('click', showPopupProfile);

closeButtonCard.addEventListener('click', () => closePopup(popupCard));

closeButtonProfile.addEventListener('click', () => closePopup(popupProfile));

closeButtonImage.addEventListener('click', () => closePopup(popupImage));

profileForm.addEventListener('submit', profileFormSubmit);

cardForm.addEventListener('submit', cardFormSubmit);




