import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import LoginForm from './LoginForm'
import withAuth from '../hocs/withAuth'
import UserProfile from './UserProfile'
import UserList from './UserList'
import CurrentUserProfile from './CurrentUserProfile'
import '../App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: {
        isLoggedIn: false,
        user: {}
      },
      users: []
    }

    this.logIn = this.logIn.bind(this)
  }

  componentDidMount() {
    if (localStorage.getItem('jwt')) {
      fetch('http://localhost:3000/api/v1/current_user', {
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': localStorage.getItem('jwt')
        }
      }).then(res => res.json())
        .then(user => {
          if (!user.error) {
            this.setState({
              auth: {
                isLoggedIn: true,
                user: user
              }
            })
          }
        })
    }

    this.retrieveAllUsers()
  }

  retrieveAllUsers() {
    fetch('http://localhost:3000/api/v1/users', {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    }).then(res => res.json())
    .then(users => this.setState({ users }))
  }

  logIn(loginParams){
    fetch('http://localhost:3000/api/v1/auth', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': localStorage.getItem('jwt')
        },
        body: JSON.stringify(loginParams)
      }).then(res => res.json() )
    .then( user => {
      if (!user.error) {
        this.setState({
          auth: { isLoggedIn: true, user: user}
        })
        localStorage.setItem('jwt', user.jwt )
        this.props.history.push(`/${user.id}`)
      }
    })
  }


  renderUsers() {
    this.retrieveAllUsers()
    return (
      <div>
        <h1>Artists and Bands</h1>
        <UserList userList={this.state.users} />
      </div>
    )
  }
  render() {
    return (
      <div className="App">
        <Switch>
        <Route path='/login' render={() => <LoginForm onSubmit={this.logIn} />} />
        <Route path='/profile' render={() => <CurrentUserProfile user={this.state.auth.user} />} />
        <Route exact path='/:id' render={(routerProps) => {
          const id = routerProps.match.params.id
          const user = this.state.users.find( u =>  u.id === parseInt(id) )

          return <UserProfile user={user} />
        }} />
        <div><Route render={this.renderUsers.bind(this)} /></div>
        </Switch>
      </div>
    );
  }
}

export default withAuth(App);
