import Popup from './Popup.js';
export default class PopupSubmit extends Popup {
  constructor({popupSelector, handleSubmit}) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupSubmitButton = this._popup.querySelector('.popup__save-button');
  }

  setLoadingText(text) {
    this._popupSubmitButton.textContent = text;
  }

  getSubmitText() {
    return this._popupSubmitButton.textContent;
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleSubmit(this._element);
    })
    super.setEventListeners();
    
  }

  open(element) {
    this._element = element;
    super.open();
  }  
}