import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { AuthAdapter, UserAdapter, SearchAdapter} from '../adapters';
import withAuth from '../hocs/withAuth';
import LoginForm from '../components/LoginForm';
import HomePageContainer from './HomePageContainer';
import SignUpForm from '../components/SignUpForm';
import Sidebar from 'react-sidebar';
import { Container, Row, Button, Media } from 'reactstrap';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults.js';
import CurrentUserProfile from '../components/CurrentUserProfile';
import UserProfile from '../components/UserProfile';
import '../App.css';


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
      open: props.open,
      searchedUsers: [],
      individualUser: ''
    }

    this.logIn = this.logIn.bind(this)
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.createUser = this.createUser.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
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
      AuthAdapter.currentUser()
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
        console.log(this.state.auth.user)
        this.props.history.push(`/profile`)
      }
    })
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
       zipcode: parseInt(user.zipcode, 10),
       setList: user.setList,
       radius_preference: user.radius_preference,
       user_genres_attributes: genresList,
       user_attributes: {username: user.username, password: user.password },
       band_instrument_preferences_attributes: instrumentsList
      }

      UserAdapter.createBand(band)
    } else {
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

  searchUsers = (searchTerms) => {
    if (searchTerms.selectedUserType === 'Artist') {
      SearchAdapter.searchArtists(searchTerms)
      .then(searchedUsers => this.setState({ searchedUsers }))
    } else {
      SearchAdapter.searchBands(searchTerms)
      .then(searchedUsers => this.setState({ searchedUsers }))
    }

    this.props.history.push('/search-results')
  }

  deleteAccount = (id, type) => {
    let urlType
    if (type === 'Band') {
      urlType = 'bands'
    } else {
      urlType = 'artists'
    }

    UserAdapter.destroy(id, urlType)
      .then( () => {
        if (type === 'Band') {
          this.setState( previousState => {
            return {
              bands: previousState.bands.filter( band => band.id !== id )
            }
          })

          this.props.history.push("/")
        } else {
          this.setState( previousState => {
            return {
              artists: previousState.artists.filter( artist => artist.id !== id )
            }
          })
          this.props.history.push("/")
        }
      })
  }

  render() {
    var sidebarContent = (
      <Container>
        <Media object data-src="https://www.alternativenation.net/wp-content/uploads/2016/04/nirvana93.jpg" alt="Generic placeholder image" />
        <Row><Link to='/profile'>Your Profile </Link></Row>
        <Row><Link to='/'>Home</Link></Row>
        <SearchBar handleSearch={this.searchUsers}/>
        <Row><Link to='/login'>Sign In</Link></Row>
        <Row><Button onClick={this.handleClickSignOut}>Sign Out</Button></Row>
        <Row><Link to='/signup'>Sign Up</Link></Row>
      </Container>
    )

    const sidebarStyles = {
      sidebar: {
        width: 260
      }
    };

    var sidebarProps = {
      sidebar: this.state.sidebarOpen,
      docked: this.state.sidebarDocked,
      onSetOpen: this.onSetSidebarOpen
    };

    return (
      <Sidebar sidebar={sidebarContent} styles={sidebarStyles} open={this.state.sidebarOpen} docked={this.state.sidebarDocked} onSetOpen={this.onSetSidebarOpen}>
        <Container fluid>
          <Switch>
            <Route exact path='/' render={() => <HomePageContainer currentUser={this.state.auth.user} />} />
            <Route exact path='/login' render={() => <LoginForm onSubmit={this.logIn} />} />
            <Route exact path='/signup' render={() => <SignUpForm onSubmit={this.createUser}/> }/>
            <Route exact path='/search-results' render={() => <SearchResults results={this.state.searchedUsers} /> }/>
            <Route path='/profile' render={() => <CurrentUserProfile user={this.state.auth.user} deleteAccount={this.deleteAccount}/>
              }/>
            <Route exact path='/:id' render={(routerProps) => {
              const id = routerProps.match.params.id
              UserAdapter.UserProfile(id)
              .then(user => this.setState({ individualUser: user }))
              return <UserProfile user={this.state.individualUser}/>
            }}/>
          </Switch>
        </Container>
      </Sidebar>
    );
  }
}

export default withAuth(App);
