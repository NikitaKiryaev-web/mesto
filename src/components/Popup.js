export default class Popup{
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeBtn = this._popup.querySelector('.popup__close');
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('click', this._handlerEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('click', this._handlerEscClose);
  }

  _handlerEscClose() {
    if(evt.key === 'Escape') {
      this.close();
    }
  }
    setEventListeners() {
      this._closeBtn.addEventListener('click', evt => {
        if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) 
          this.close();
      });
    }
  }