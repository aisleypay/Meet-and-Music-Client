import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import { AuthAdapter } from '../adapters'
import LoginForm from '../components/LoginForm'
import withAuth from '../hocs/withAuth'
import UsersListContainer from './UsersListContainer'
import SignUpForm from '../components/SignUpForm'
import '../App.css';
import Sidebar from 'react-sidebar';

const mql = window.matchMedia(`(min-width: 800px)`);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {
        isLoggedIn: false,
        user: {}
      },
      mql: mql,
      docked: props.docked,
      open: props.open
    }

    this.logIn = this.logIn.bind(this)
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
   this.setState({sidebarOpen: open});
 }

 componentWillMount() {
   mql.addListener(this.mediaQueryChanged);
   this.setState({mql: mql, sidebarDocked: mql.matches});
 }

 componentWillUnmount() {
   this.state.mql.removeListener(this.mediaQueryChanged);
 }

 mediaQueryChanged() {
   this.setState({sidebarDocked: this.state.mql.matches});
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
    var sidebarContent = (
      <div className= 'container-fluid'>
        <img className='profile-pic' alt="Profile Pic" src="https://www.alternativenation.net/wp-content/uploads/2016/04/nirvana93.jpg"/>
        <div className='row'><Link to='/profile'>Your Profile </Link></div>
        <div className='row'><Link to='/'>Artists and Bands Listings </Link></div>
        <div>
          <form className="form-inline">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
        <div className='row'><Link to='/login'>Sign In</Link></div>
        <div className='row'><input type="button" onClick={this.handleClickSignOut} value='Sign Out'/></div>
      </div>
    )

    const sidebarStyles = {
      sidebar: {
        width: 200
      }
    };
    var sidebarProps = {
      sidebar: this.state.sidebarOpen,
      docked: this.state.sidebarDocked,
      onSetOpen: this.onSetSidebarOpen
    };

    return (
      <div>
        <div>
          <Sidebar sidebar={sidebarContent}
              styles={sidebarStyles}
               open={this.state.sidebarOpen}
               docked={this.state.sidebarDocked}
               onSetOpen={this.onSetSidebarOpen}>

               <div className='container'>
                 <Switch>
                   <Route path='/login' render={() => <LoginForm onSubmit={this.logIn} />} />
                   <Route path='/signup' render={() => <SignUpForm onSubmit={this.createUser} />} />
                   <Route path='/' render={() => <UsersListContainer currentUser={this.state.auth.user}/>} />
                 </Switch>
               </div>
          </Sidebar>
        </div>
      </div>
    );
  }
}

export default withAuth(App);
