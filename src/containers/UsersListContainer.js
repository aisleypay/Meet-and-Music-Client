import React, { Component} from 'react';
import {Switch, Route} from 'react-router-dom'
import { UserAdapter } from '../adapters'
import CurrentUserProfile from '../components/CurrentUserProfile'
import UserProfile from '../components/UserProfile'
import UserList from '../components/UserList'

export default class UsersListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bands: [],
      artists: []
    }

    this.retrieveAllBands = this.retrieveAllBands.bind(this)
    this.retrieveAllArtists = this.retrieveAllArtists.bind(this)
  }

  componentDidMount() {
    this.retrieveAllBands();
    this.retrieveAllArtists();
  }

  retrieveAllBands() {
    UserAdapter.allBands()
    .then(bands => this.setState({ bands }))
  }

  retrieveAllArtists(){
    UserAdapter.allArtists()
    .then(artists => this.setState({ artists }))
  }

  render() {
    if (this.state.bands.length === 0) {
      return <div>Loading...</div>
    }
    return (
      <div className='container-fluid'>
        <Switch>
          <Route exact path='/profile' render={() => {
              const id = this.props.currentUser.id
              const users = this.state.bands.concat(this.state.artists)
              const user = users.find(u => u.user.id === parseInt(id, 10))
              return <CurrentUserProfile user={user}/>
            }}/>
            <Route exact path='/:id' render={(routerProps) => {
                const id = routerProps.match.params.id
                const users = this.state.bands.concat(this.state.artists)
                const user = users.find(u => u.user.id === parseInt(id, 10))
                return <UserProfile user={user}/>
              }}/>
            <div><Route exact path='/' render={() => <UserList bands={this.state.bands} artists={this.state.artists}/>}/></div>
            </Switch>
      </div>
    )
  }
}
