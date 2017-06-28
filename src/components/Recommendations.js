import React, { Component } from 'react';
import withAuth from '../hocs/withAuth';
import { Link } from 'react-router-dom'


class Recommendations extends Component {
  renderRecommendations() {
    this.props.recommendations.map(r => {
      return (
        <div>
          <Link to={`/${r.user.id}`}>{r.name}</Link>
          <p>{r.experience_in_years}</p>
          <h3>Instruments</h3>
          {r.instruments.map((i, index) => { return <li key={index}>i.name</li>})}
          <h3>Genres</h3>
          {r.genres.map(g => { return <li key={g.id}>g.name</li>})}
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        {this.props.recommendations.map(r => {
          return (
            <div>
              <Link to={`/${r.user.id}`}>{r.name}</Link>
              <p>{r.experience_in_years}</p>
              <h3>Instruments</h3>
              {r.instruments.map((i, index) => { return <li key={index}>{i.name}</li>})}
              <h3>Genres</h3>
              {r.genres.map((g, index) => { return <li key={index}>{g.name}</li>})}
            </div>
          )
        })}
      </div>
    )
  }
}

export default withAuth(Recommendations)
