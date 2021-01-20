export class Card {
  constructor({title, link, ownerId, userId, cardId, handleCardClick, handleDeleteButton, likes, handleLikeClick}, cardSelector) {
    this._title = title;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButton = handleDeleteButton;
    this._handleLikeClick = handleLikeClick;
    this._likes = likes;
    this._ownerId = ownerId;
    this._cardId = cardId;
    this._userId = userId;
  }

  _getTemplate() {
    const template = document.querySelector(this._cardSelector).content.querySelector('.photos__card').cloneNode(true);
    return template;
  }

  getCardId() {
    return this._cardId;
  }
 
 

  _setEventListeners() {
    this._cardImage.addEventListener('click', this._handleCardClick);
    this._deleteButton.addEventListener('click', this._handleDeleteButton);
    this._cardLikeButton.addEventListener('click', this._handleLikeClick);
  }

  ownLike() {
    return this._likes.some(like => {
        return like._id === this._userId;
    });
  }

  likeState() {
    if(this.ownLike()) {
      this._cardLikeButton.classList.add('photos__like-button_active');
    }
    else {
      this._cardLikeButton.classList.remove('photos__like-button_active');
    }
  }

  renderLikes() {
    this._likesCounter.textContent = this._likes.length;
    this.likeState();
  }

  setLikes(newLikes) {
    this._likes = newLikes;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _checkTrashButton() {
    if(this._userId !== this._ownerId) {
      this._deleteButton.classList.add('photos__delete-button_inactive');
    }
    else {
      this._deleteButton.classList.remove('photos__delete-button_inactive');
    }
  }


  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.photos__illustration');
    this._cardTitle = this._element.querySelector('.photos__title');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._cardLikeButton = this._element.querySelector('.photos__like-button');
    this._deleteButton = this._element.querySelector('.photos__delete-button');
    this._likesCounter = this._element.querySelector('.photos__like-counter');
    this._cardTitle.textContent = this._title;
    this._setEventListeners();
    this._checkTrashButton();
    this.renderLikes();

    return this._element;

  }

}

