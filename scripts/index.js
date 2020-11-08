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
const popupIllustration = popupImage.querySelector('.popup__illustration');
const popupDescription = popupImage.querySelector('.popup__description');
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



function showPopupProfile() {
  popupProfile.classList.add('popup_opened')
  nameField.value = nameTitle.textContent;
  professionField.value = professionTitle.textContent;
};

function showPopupCard() {
  popupCard.classList.add('popup_opened')
};

function showPopupImage (event) {
  popupImage.classList.add('popup_opened');
  popupIllustration.src = event.target.src;
  popupDescription.textContent = event.target.closest('.photos__card').querySelector('.photos__title').textContent; 
}

function closePopupImage () {
  popupImage.classList.remove('popup_opened');
}

function closePopupCard() {
  popupCard.classList.remove('popup_opened');
};

function closePopupProfile() {
  popupProfile.classList.remove('popup_opened');
};

function profileFormSubmit(event) {
  event.preventDefault();
  nameTitle.textContent = nameField.value;
  professionTitle.textContent = professionField.value;
  closePopupProfile();
}

function cardFormSubmit(event) {
  event.preventDefault();
  let name = titleField.value;
  let link = urlField.value;
  initialCards.push({name, link});
  
  addCard(initialCards[initialCards.length - 1]);

  closePopupCard();
}


function deleteCard(event) {
  event.target.closest('.photos__card').remove();
}


function addLike(event) {
  event.target.classList.toggle('photos__like-button_active'); 
}


function addCard (card) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  
  cardElement.querySelector('.photos__illustration').src = card.link;

  cardElement.querySelector('.photos__illustration').addEventListener('click', showPopupImage);

  cardElement.querySelector('.photos__title').textContent = card.name;

  cardElement.querySelector('.photos__delete-button').addEventListener('click', deleteCard);

  cardElement.querySelector('.photos__like-button').addEventListener('click', addLike);

  photos.prepend(cardElement);
}

initialCards.forEach(addCard);








addButton.addEventListener('click', showPopupCard);

editButton.addEventListener('click', showPopupProfile);

closeButtonCard.addEventListener('click', closePopupCard);

closeButtonProfile.addEventListener('click', closePopupProfile);

closeButtonImage.addEventListener('click', closePopupImage);

profileForm.addEventListener('submit', profileFormSubmit);

cardForm.addEventListener('submit', cardFormSubmit);

