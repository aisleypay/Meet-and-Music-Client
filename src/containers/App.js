import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, currentUser, signOut, createBand, createArtist, searchUsers} from '../actions';
import { bindActionCreators } from 'redux';
import withAuth from '../hocs/withAuth';
import LoginForm from '../components/LoginForm';
import HomePageContainer from './HomePageContainer';
import SignUpForm from '../components/SignUpForm';
import Sidebar from 'react-sidebar';
import { Container, Row, Button, Col } from 'reactstrap';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults.js';
import CurrentUserProfile from './CurrentUserProfile';
import UserProfile from './UserProfile';
import '../styles/App.css';
import '../styles/nav_bar.css';

const mql = window.matchMedia('(min-width: 800px)');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mql,
      docked: props.docked,
      open: props.open,
    };

    this.logIn = this.logIn.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.createUser = this.createUser.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
    this.handleClickSignOut = this.handleClickSignOut.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({ mql, sidebarDocked: mql.matches });
  }

  componentDidMount() {
    if (localStorage.getItem('jwt')) {
      this.props.currentUser();
    }
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: this.state.mql.matches });
  }

  logIn(loginParams) {
    this.props.login(loginParams);
    localStorage.setItem('jwt', this.props.user.jwt);
    this.props.history.push('/profile');
  }

  handleClickSignOut(e) {
    e.preventDefault();
    localStorage.clear();
    this.props.signOut();
    this.props.history.push('/login');
  }

  createUser(user, genres, instruments) {
    const genresList = genres.map(g => ({ genre_id: g }));
    const instrumentsList = instruments.map(i => ({ instrument_id: i }));

    const userInfo = {
      name: user.name,
      state: user.state,
      zipcode: parseInt(user.zipcode, 10),
      setList: user.setList,
      radius_preference: user.radius_preference,
      user_genres_attributes: genresList,
      user_attributes: {
        username: user.username,
        password: user.password,
        email: user.email,
      },
    };

    if (user.type === 'Band') {
      userInfo.band_instrument_preferences_attributes = instrumentsList;
      this.props.createBand(userInfo);
    } else {
      userInfo.artist_instruments_attributes = instrumentsList;
      userInfo.experience_in_years = user.experience_in_years;
      userInfo.age = user.age;
      this.props.createArtist(userInfo);
    }
  }

  searchUsers(searchTerms) {
    this.props.searchUsers(searchTerms);
    this.props.history.push('/search-results');
  }

  render() {
    const sidebarContent = (
      <Container className="nav-bar">
        <Row>
          <Col>
            <Col><img src="logo2.svg" alt="broken link" /></Col>
            <Button className="btn btn-link" size="md">
              <Link to="/profile">Your Profile</Link>
            </Button>
            <Button className="btn btn-link" size="md">
              <Link to="/">Home</Link>
            </Button>
            <SearchBar handleSearch={this.searchUsers} />
            <Button
              className="btn btn-link"
              size="md"
            >
              <Link to="/login">Sign In</Link>
            </Button>
            <br />
            <Button
              className="btn btn-link"
              size="md"
              onClick={this.handleClickSignOut}
            >Sign Out
            </Button><br />
            <Button className="btn btn-link" size="md">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </Col>
        </Row>
        <Row className="footer">
          <p>Meet and Music ©</p>
        </Row>
      </Container>
    );

    const sidebarStyles = {
      sidebar: {
        width: '15%',
        backgroundColor: 'rgba(0,0,0,1)',
        textAlign: 'center',
      },
      content: {
        backgroundImage: "url('https://static.pexels.com/photos/145707/pexels-photo-145707.jpeg')",
        backgroundSize: 'cover',
        textAlign: 'center',
      },
    };

    const mainStyle = {
      padding: 0
    }

    return (
      <Sidebar
        sidebar={sidebarContent}
        styles={sidebarStyles}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
      >
        <Container fluid className="master" style={mainStyle}>
          <Switch>
            <Route exact path="/" render={() => <HomePageContainer />} />
            <Route exact path="/login" render={() => <LoginForm onSubmit={this.logIn} />} />
            <Route exact path="/signup" render={() => <SignUpForm onSubmit={this.createUser} />} />
            <Route
              exact
              path="/search-results"
              render={() => <SearchResults results={this.props.searchedUsers} />}
            />
            <Route path="/profile" render={() => <CurrentUserProfile />} />
            <Route
              exact
              path="/:id"
              render={(routerProps) => {
                const id = routerProps.match.params.id;
                return <UserProfile id={id} currentUser={this.props.user} />;
              }}
            />
          </Switch>
        </Container>
      </Sidebar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.auth.user,
    searchedUsers: state.users.searchedUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login,
    currentUser,
    signOut,
    createBand,
    createArtist,
    searchUsers,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(App));
