const devUrl = 'http://localhost:3000/api/v1'
const prodUrl = `https://meet-and-music0api.herokuapp.com/api/v1`

export class AuthAdapter {
  static logIn(loginParams) {
    return fetch(`${devUrl}/auth`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(loginParams)
      }).then(res => res.json() )
  }

  static currentUser(){
    return fetch(`${devUrl}/current_user`, {
      headers: headers()
    }).then(res => res.json())
  }
}

export class UserAdapter {
  static retrieveFeaturedBands() {
    return fetch(`${devUrl}/bands/featured`, {
      headers: headers()
    }).then(res => res.json())
  }

  static retrieveFeaturedArtists() {
    return fetch(`${devUrl}/artists/featured`, {
      headers: headers()
    }).then(res => res.json())
  }

  static UserProfile(id) {
    return fetch(`${devUrl}/users/${id}`, {
      headers: headers()
    }).then(res => res.json())
  }

  static createBand(band) {
    return fetch(`${devUrl}/bands`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        band: band
      })
    }).then(res => res.json())
  }

  static createArtist(artist) {
    return fetch(`${devUrl}/artists`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        artist: artist
      })
    }).then(res => res.json())
  }

  static destroy(id, type){
    return fetch(`${devUrl}/${type}/${id}`, {
      method: 'DELETE',
      headers: headers()
    }).then(res => res.json() )
  }

  static reachOutEmail(id, recipient) {
    return fetch(`${devUrl}/users/${id}/reach-out`, {
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
    return fetch(`${devUrl}/decisions`, {
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
    return fetch(`${devUrl}/decisions`, {
      headers: headers()
    }).then(res => res.json())
  }
}

export class RecommendationAdapter {
  static getBandRecommendations(user) {
    return fetch(`${devUrl}/bands/${user.id}/recommended-artists`, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt'),
        'id': user
      }
    }).then(res => res.json())
  }

  static getArtistRecommendations(user) {
    return fetch(`${devUrl}/artists/${user.id}/recommended-bands`, {
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
    return fetch(`${devUrl}/instruments`, {
      headers: headers()
    }).then(res => res.json())
  }
}

export class GenreAdapter {
  static allGenres() {
    return fetch(`${devUrl}/genres`, {
      headers: headers()
    }).then(res => res.json())
  }
}

export class SearchAdapter {
  static searchArtists(searchTerms) {
    return fetch(`${devUrl}/artists/search-artists`, {
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
    return fetch(`${devUrl}/bands/search-bands`, {
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
