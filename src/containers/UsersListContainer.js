import React, { Component} from 'react';
import {Link, Switch, Route} from 'react-router-dom'
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
    return (
      <Switch>
      <Route exact path='/profile' render={() => {
        const id = this.props.currentUser.id
        const user = this.state.users.find(u => u.id === parseInt(id))
        return <CurrentUserProfile user={user}/>
      }}/>
      <Route exact path='/:id' render={(routerProps) => {
        const id = routerProps.match.params.id
        debugger
        const users = this.state.bands + this.state.artists
        const user = users.find(u => u.user.id === parseInt(id))
        return <UserProfile user={user}/>
      }}/>
      <div><Route path='/' render={() => <UserList bands={this.state.bands} artists={this.state.artists}/>}/></div>
      </Switch>
    )
  }
}
