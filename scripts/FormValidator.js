export class FormValidator {
  constructor (form, config) {
    this._form = form;
    this._config = config;
    this._button = this._form.querySelector(this._config.submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(config.inputSelector));
  }

  _showError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._config.inputErrorClass);
  }

  _hideError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showError(input);
    }
    else {
      this._hideError(input);
    }
  }

  _setButtonState(isActive) {
    if (!isActive) {
      this.setButtonStateDisabled();
    }
    else {
      this.setButtonStateActive();
    }
  }

  _setEventListeners() {
    this._setButtonState(this._form.checkValidity());
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._setButtonState(this._form.checkValidity());
      });
    });  
  }

  setButtonStateActive() {
    this._button.classList.remove(this._config.inactiveButtonClass);
    this._button.disabled = false;
  }

  setButtonStateDisabled() {
    this._button.classList.add(this._config.inactiveButtonClass);
    this._button.disabled = true;
  }

  clearErrors() {
    this._inputList.forEach((input) => {
      this._hideError(input);
    });

    this._inputList.forEach((input) => {
      input.classList.remove('popup__input_type_error');
    })
  }

  enableValidation() {
    this._setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
  }
}