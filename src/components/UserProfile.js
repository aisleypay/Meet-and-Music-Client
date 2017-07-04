import React, { Component } from 'react';

class UserProfile extends Component {

  genresList(genres) {
    return genres.map(g => <li key={g.id}>{g.name}</li>)
  }

  instrumentsList(instruments) {
    return instruments.map(i => <li key={i.id}>{i.name}</li>)
  }

  renderUser(user, type) {
    return (
      <div>
        <img src={user.profile_pic} alt="Link Broken"/>
        <h1>{user.name}</h1>
        <h2>{user.state}</h2>
        <h2>{user.zipcode}</h2>
        { type === 'Artist' ? <h2>{user.age}</h2> : null}
        { type === 'Artist' ? <h2>{user.experience_in_years}</h2> : null}
        <ul>{this.genresList(user.genres)}</ul>
        { type === 'Artist' ? <ul>{this.instrumentsList(user.instruments)}</ul> : null}
      </div>
    )
  }

  render() {
    if (this.props.user === "") {
      return <div>Loading...</div>
    }
    return (
      <div>
        {this.renderUser(this.props.user.meta, this.props.user.meta_type)}
      </div>
    )
  }
}

export default UserProfile
