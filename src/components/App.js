import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { AuthAdapter } from '../adapters'
import LoginForm from './LoginForm'
import withAuth from '../hocs/withAuth'
import UsersListContainer from '../containers/UsersListContainer'
import SignUpForm from './SignUpForm'
import '../App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: {
        isLoggedIn: false,
        user: {}
      }
    }

    this.logIn = this.logIn.bind(this)
  }

  componentDidMount() {
    if (localStorage.getItem('jwt')) {
      AuthAdapter.currenUser()
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
  }

  logIn(loginParams){
    AuthAdapter.logIn(loginParams)
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

  renderUsers = () => {
    return (
      <div>
        <UsersListContainer currentUser={this.state.auth.user}/>
      </div>
    )
  }
  render() {
    return (
      <div>
        <Switch>
        <Route path='/login' render={() => <LoginForm onSubmit={this.logIn} />} />
        <Route path='/signup' render={() => <SignUpForm onSubmit={this.createUser} />} />
        <div><Route render={this.renderUsers} /></div>
        </Switch>
      </div>
    );
  }
}

export default withAuth(App);
