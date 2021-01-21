import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor ({popupSelector, handlerSubmit}) {
    super(popupSelector);
    this._handlerSubmit = handlerSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupSubmitButton = this._popup.querySelector('.popup__save-button');
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
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
      this._handlerSubmit(this._getInputValues());
    })
    super.setEventListeners();

  }

  close() {
    super.close();
    this._popupForm.reset();
}
}