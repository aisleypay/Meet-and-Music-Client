import React, {Component} from 'react';
import withAuth from '../hocs/withAuth';
import '../index.css'
import Cards, {Card} from 'react-swipe-card'

class Recommendations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accepted: [],
      rejected: []
    }
  }

  handleContactClick = (e) => {
    let recommendeeId = e.target.getAttribute('data-recommendee');
    let recommendeeType = e.target.getAttribute('data-userType');

    if (recommendeeType === 'Artist') {
      fetch(`http://localhost:3000/api/v1/decisions`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': localStorage.getItem('jwt')
        },
        body: JSON.stringify({
          decision: {
            status: true,
            decider_id: this.props.user.id,
            chosen_id: recommendeeId
          }
        })
      }).then(res => res.json())
      .then(decision => this.setState((pstate) => {
        return {
          accepted: [...pstate.accepted, decision]
        }
      }))
      .catch(function() {
        console.log('not working')
      })
    }
  }

  handleRejectClick = (rec) => {
    console.log('Will Contact')
  }

  render() {
    return (
      <div>
        {this.props.recommendations.map(rec => {
          return (
            <div className="card text-center" key={rec.user.id} >
              <div className="card-block">
                <h4 className="card-title">{rec.name}</h4>
                <p className="card-text">{rec.instruments.map((i, index) => {
                    return <li key={index}>{i.name}</li>
                  })}</p>
                <p className="card-text">{rec.genres.map((g, index) => {
                    return <li key={index}>{g.name}</li>
                  })}</p>
                <a href={`/${rec.user.id}`} className="btn btn-primary">Check Me Out</a>
                <button className="btn btn-primary" data-recommendee={`${rec.user.id}`} data-userType={`${rec.user.meta_type}`} onClick={this.handleContactClick }>Will Contact</button>
                <button className="btn btn-primary" data-recommendee={`${rec.user.id}`} data-userType={`${rec.user.meta_type}`} onClick={this.handleRejectClick}>Reject</button>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default withAuth(Recommendations)
