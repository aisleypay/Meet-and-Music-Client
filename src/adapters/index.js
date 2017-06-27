export class AuthAdapter {
  static logIn(loginParams) {
    return fetch('http://localhost:3000/api/v1/auth', {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(loginParams)
      }).then(res => res.json() )
  }

  static currenUser(){
    return fetch('http://localhost:3000/api/v1/current_user', {
      headers: headers()
    }).then(res => res.json())
  }
}

export class UserAdapter {
  static allBands() {
    return fetch('http://localhost:3000/api/v1/bands', {
      headers: headers()
    }).then(res => res.json())
  }

  static allArtists() {
    return fetch('http://localhost:3000/api/v1/artists', {
      headers: headers()
    }).then(res => res.json())
  }
}

function headers() {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  }
}
