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

  static createBand(band) {
    return fetch('http://localhost:3000/api/v1/bands', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        band: band
      })
    }).then(res => res.json())
  }

  static createArtist(artist) {
    return fetch('http://localhost:3000/api/v1/artists', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        artist: artist
      })
    }).then(res => res.json())
  }
}

export class DecisionAdapter {
  static bandDecision(recommendeeId, user, status) {
    return fetch(`http://localhost:3000/api/v1/decisions`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        decision: {
          status: status,
          decider_attributes: user,
          chosen_id: recommendeeId
        }
      })
    }).then(res => res.json())
  }
}

export class InstrumentAdapter {
  static allInstruments() {
    return fetch('http://localhost:3000/api/v1/instruments', {
      headers: headers()
    }).then(res => res.json())
  }
}

export class GenreAdapter {
  static allGenres() {
    return fetch('http://localhost:3000/api/v1/genres', {
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
