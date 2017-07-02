import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import { AuthAdapter } from '../adapters'
import LoginForm from '../components/LoginForm'
import UsersListContainer from './UsersListContainer'
import SignUpForm from '../components/SignUpForm'
import '../App.css';
import Sidebar from 'react-sidebar';
import { Container, Row, Button, Media } from 'reactstrap';
import { UserAdapter } from '../adapters'


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
    this.createUser = this.createUser.bind(this)
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
    debugger
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

  createUser(user, genres, instruments) {
    let genresList = genres.map(g => { return {genre_id: g} })
    let instrumentsList = instruments.map(i => { return {instrument_id:i} })

    if (user.type === 'Band') {
      let band = {
       name: user.name,
       state: user.state,
       zipcode: parseInt(user.zipcode),
       setList: user.setList,
       radius_preference: user.radius_preference,
       user_genres_attributes: genresList,
       user_attributes: {username: user.username, password: user.password },
       band_instrument_preferences_attributes: instrumentsList
      }

      UserAdapter.createBand(band)
    } else {
      // DRY it up, create a base object and add keys as needed
      let artist = {
        name: user.name,
        state: user.state,
        zipcode: user.zipcode,
        age: user.age,
        setList: user.setList,
        radius_preference: user.radius_preference,
        experience_in_years: user.experience_in_years,
        user_genres_attributes: genresList,
        artist_instruments_attributes: instrumentsList,
        user_attributes: {username: user.username, password: user.password }
      }
      UserAdapter.createArtist(artist)
    }
  }

  render() {
    var sidebarContent = (
      <Container fluid>
        <Media object data-src="https://www.alternativenation.net/wp-content/uploads/2016/04/nirvana93.jpg" alt="Generic placeholder image" />
        <Row><Link to='/profile'>Your Profile </Link></Row>
        <Row><Link to='/'>Artists and Bands Listings </Link></Row>
        <div>
          <form className="form-inline">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
        <Row><Link to='/login'>Sign In</Link></Row>
        <Row><Button onClick={this.handleClickSignOut}>Sign Out</Button></Row>
        <Row><Link to='/signup'>Sign Up</Link></Row>
      </Container>
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
      <Sidebar sidebar={sidebarContent}
        styles={sidebarStyles}
         open={this.state.sidebarOpen}
         docked={this.state.sidebarDocked}
         onSetOpen={this.onSetSidebarOpen}>

         <Container>
           <Switch>
             <Route path='/login' render={() => <LoginForm onSubmit={this.logIn} />} />
             <Route path='/signup' render={() => <SignUpForm onSubmit={this.createUser} />} />
             <Route path='/' render={() => <UsersListContainer currentUser={this.state.auth.user}/>} />
           </Switch>
         </Container>
      </Sidebar>
    );
  }
}

export default App;
