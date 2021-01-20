import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {validationConfig, initialCards} from '../utils/Constants.js';
import './index.css';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupSubmit from '../components/PopupSubmit.js';
import {editButton, editAvatarButton, addButton, nameField, professionField, profileForm, avatarForm, cardForm} from '../utils/Constants.js'


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-19',
  token: 'cdc2b984-82a4-4b35-acbd-93038325fc29'
})

const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

const popupWithAvatar = new PopupWithForm({popupSelector: '.popup_avatar',
handlerSubmit: item => {
  api.editProfileAvatar(item)
    .then(res => {
      userData.setUserAvatar(res)
    })
    .catch(err => {
      console.log(err);
    })
}})
popupWithAvatar.setEventListeners();

const userData = new UserInfo({nameSelector: '.profile__title',
 professionSelector: '.profile__subtitle', avatarSelector: '.profile__avatar'});

const popupWithProfile = new PopupWithForm({popupSelector: '.popup_profile',
 handlerSubmit: item => {
   const submitText = popupWithProfile.getSubmitText();
   popupWithProfile.setLoadingText('Сохранение...');
   api.editProfile(item)
    .then(res => {
      userData.setUserInfo(res)
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupWithProfile.setLoadingText(submitText);
    })
}});  
popupWithProfile.setEventListeners();

const popupDeleteCard = new PopupSubmit({popupSelector: '.popup_delete-card', handleSubmit: (card) => {
  const submitText = popupDeleteCard.getSubmitText();
  popupDeleteCard.setLoadingText('Удаление...');
  api.deleteCard(card.getCardId())
    .then(res => {
      card.deleteCard();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      popupDeleteCard.setLoadingText(submitText);
    })
}})

popupDeleteCard.setEventListeners();

const popupCreateCard = new PopupWithForm({popupSelector: '.popup_card',
handlerSubmit: (item) => {
  const submitText = popupCreateCard.getSubmitText();
  popupCreateCard.setLoadingText('Создание...')
  api.addCard(item)
  .then(res => {
    const card = newCard(res);
    cardSection.addItem(card);
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    popupCreateCard.setLoadingText(submitText);
  })
}})
popupCreateCard.setEventListeners();

const cardSection = new Section({renderer: (item) => {
  const card = newCard(item);
  cardSection.addItem(card);
}}, '.photos')

api.getInitialCards()
  .then(res => {
    cardSection.setItems(res);
  })
  .catch(err => {
    console.log(err);
  })


function newCard(item) {
  const card = new Card ({
     title: item.name,
     link: item.link,
     ownerId: item.owner._id,
     userId: userData.getUserId(),
     cardId: item._id,
     handleCardClick: () => {
    popupWithImage.open(item);
  },
  handleDeleteButton: () => {
    popupDeleteCard.open(card);
  }, 
  likes: item.likes,
  handleLikeClick: () => {
    const likedCard = card.ownLike();
    const toggleLikeApi = likedCard ? api.unlikeCard(card.getCardId()) : api.likeCard(card.getCardId());
    toggleLikeApi
      .then(res => {
        card.setLikes(res.likes);
        card.renderLikes();
      })
      .catch(err => {
        console.log(err);
      })
  }
}, '#card-template')
  const generatedCard = card.createCard();
  return generatedCard;
}

function showPopupProfile() {
  const user = userData.getUserInfo(); 
  nameField.value = user.name;
  professionField.value = user.about;
  ProfileValidation.setButtonStateActive();
  ProfileValidation.clearErrors();
  popupWithProfile.open();
};

function showPopupCard() {
  popupCreateCard.open();
};

function showPopupAvatar() {
  AvatarValidation.setButtonStateDisabled();
  AvatarValidation.clearErrors();
  popupWithAvatar.open();
}



api.getProfileInfo()
  .then(response => {
    userData.setUserInfo(response);
    userData.setUserAvatar(response);
  })
  .catch(err => {
    console.log(err);
  })


const ProfileValidation = new FormValidator(profileForm, validationConfig);
const CardValidation = new FormValidator(cardForm, validationConfig);
const AvatarValidation = new FormValidator(avatarForm, validationConfig);

ProfileValidation.enableValidation();
CardValidation.enableValidation();
AvatarValidation.enableValidation();


addButton.addEventListener('click', showPopupCard);
editAvatarButton.addEventListener('click', showPopupAvatar);
editButton.addEventListener('click', showPopupProfile);

