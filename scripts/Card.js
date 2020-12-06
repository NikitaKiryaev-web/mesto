import {showPopupImage} from './index.js';

export class Card {
  constructor(title, link, cardSelector) {
    this._title = title;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const template = document.querySelector(this._cardSelector).content.querySelector('.photos__card').cloneNode(true);
    return template;
  }

  _deleteCard(event) {
    event.target.closest('.photos__card').remove();
  }

  _addLike(event) {
    event.target.classList.toggle('photos__like-button_active');
  }

  _showPopupImage() {
    showPopupImage(this._link, this._title);
  }

  _setEventListeners() {
    this._element.querySelector('.photos__like-button').addEventListener('click', this._addLike);
    this._element.querySelector('.photos__delete-button').addEventListener('click', this._deleteCard);
    this._cardImage.addEventListener('click',() => {
       this._showPopupImage(); 
      });

  }

  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.photos__illustration');
    this._cardTitle = this._element.querySelector('.photos__title');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;
    this._setEventListeners();

    return this._element;

  }

}

