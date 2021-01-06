export default class UserInfo {
  constructor({nameSelector, professionSelector}) {
    this._name = document.querySelector(nameSelector);
    this._profession = document.querySelector(professionSelector);
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo.name = this._name.textContent;
    this._userInfo.profession = this._profession.textContent;
    return this._userInfo;
  }

  setUserInfo({name, profession}) {
    this._name.textContent = name;
    this._profession.textContent = profession;
  }
}