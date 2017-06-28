import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import { AuthAdapter } from '../adapters'
import LoginForm from '../components/LoginForm'
import withAuth from '../hocs/withAuth'
import UsersListContainer from './UsersListContainer'
import SignUpForm from '../components/SignUpForm'
import '../App.css';
import Sidebar from 'react-sidebar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: {
        isLoggedIn: false,
        user: {}
      },
      sidebarOpen: false
    }

    this.logIn = this.logIn.bind(this)
     this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({sidebarOpen: open});
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
        this.props.history.push(`/profile`)
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

  handleClickSignOut = (e) => {
    e.preventDefault()
    localStorage.clear()
    this.setState({
      auth: {
        isLoggedIn: false,
        user: {}
      }
    })

    this.props.history.push(`/login`)
  }

  render() {
    var sidebarContent = <b>Sidebar content</b>;
    return (
      <div>
        <Sidebar sidebar={sidebarContent}
              open={this.state.sidebarOpen}
              onSetOpen={this.onSetSidebarOpen}>
         <b>Main content</b>
       </Sidebar>
        <nav>
          <Link to='/profile'>Your Profile </Link>
          <Link to='/'>Artists and Bands Listings </Link>
          <input type="button" onClick={this.handleClickSignOut} value='Sign Out'/>
        </nav>
        <Switch>
          <Route path='/login' render={() => <LoginForm onSubmit={this.logIn} />} />
          <Route path='/signup' render={() => <SignUpForm onSubmit={this.createUser} />} />
          <Route path='/' render={() => <UsersListContainer currentUser={this.state.auth.user}/>} />
        </Switch>
      </div>
    );
  }
}

export default withAuth(App);
