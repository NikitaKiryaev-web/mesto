export default class Api {
  constructor(options) {
    this._url = options.url;
    this._token = options.token;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token
      }
    }
    )
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      
      return Promise.reject(`Error: ${res.status} ${res.statusText}`);     
    })
     
  }

  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status} ${res.statusText}`)
    })
  }

  addCard(item) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      
        return Promise.reject(`Error: ${res.status} ${res.statusText}`);
      
    })
    
  }

  editProfile(item) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: item.name,
        about: item.profession
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      
        return Promise.reject(`Error: ${res.status} ${res.statusText}`);
      
    })
    
  }
  
  editProfileAvatar(item) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: item.avatar
      })
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status} ${res.statusText}`);
    })
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status} ${res.statusText}`);
    })
  }

  likeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status} ${res.statusText}`);
    })
  }

  unlikeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status} ${res.statusText}`);
    })
  }


}