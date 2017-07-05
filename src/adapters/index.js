export class AuthAdapter {
  static logIn(loginParams) {
    return fetch('http://localhost:3000/api/v1/auth', {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(loginParams)
      }).then(res => res.json() )
  }

  static currentUser(){
    return fetch('http://localhost:3000/api/v1/current_user', {
      headers: headers()
    }).then(res => res.json())
  }
}

export class UserAdapter {
  static retrieveFeaturedBands() {
    return fetch('http://localhost:3000/api/v1/bands/featured', {
      headers: headers()
    }).then(res => res.json())
  }

  static retrieveFeaturedArtists() {
    return fetch('http://localhost:3000/api/v1/artists/featured', {
      headers: headers()
    }).then(res => res.json())
  }

  static UserProfile(id) {
    return fetch(`http://localhost:3000/api/v1/users/${id}`, {
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

  static destroy(id, type){
    return fetch(`http://localhost:3000/api/v1/${type}/${id}`, {
      method: 'DELETE',
      headers: headers()
    }).then(res => res.json() )
  }

  static reachOutEmail(id, recipient) {
    return fetch(`http://localhost:3000/api/v1/users/${id}/reach-out`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        recipient: recipient
      })
    }).then(res => res.json() )
  }
}

export class DecisionAdapter {
  static makeDecision(recommendeeId, user, status) {
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

  static getDecisions() {
    return fetch(`http://localhost:3000/api/v1/decisions`, {
      headers: headers()
    }).then(res => res.json())
  }
}

export class RecommendationAdapter {
  static getBandRecommendations(user) {
    return fetch(`http://localhost:3000/api/v1/bands/${user.id}/recommended-artists`, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt'),
        'id': user
      }
    }).then(res => res.json())
  }

  static getArtistRecommendations(user) {
    return fetch(`http://localhost:3000/api/v1/artists/${user.id}/recommended-bands`, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt'),
        'id': user
      }
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

export class SearchAdapter {
  static searchArtists(searchTerms) {
    return fetch('http://localhost:3000/api/v1/artists/search-artists', {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt'),
        'instrument': searchTerms.instrumentSelected,
        'genre': searchTerms.genreSelected,
        'zipcode': searchTerms.zipcode,
        'radius': searchTerms.radius
      }
    }).then(res => res.json())
  }

  static searchBands(searchTerms) {
    return fetch('http://localhost:3000/api/v1/bands/search-bands', {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt'),
        'instrument': searchTerms.instrumentSelected,
        'genre': searchTerms.genreSelected,
        'zipcode': searchTerms.zipcode,
        'radius': searchTerms.radius
      }
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
