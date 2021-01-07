export default class Popup{
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._closeBtn = this._popup.querySelector('.popup__close');
    this._handlerEscClose = this._handlerEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handlerEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handlerEscClose);
  }

  _handlerEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }
    setEventListeners() {
      this._popup.addEventListener('click', evt => {
        if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
          this.close(); }
      });
    }
  }