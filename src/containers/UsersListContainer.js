import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'
import {UserAdapter} from '../adapters'
import CurrentUserProfile from '../components/CurrentUserProfile'
import UserProfile from '../components/UserProfile'
import UserList from '../components/UserList'
import {Container} from 'reactstrap';

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
    UserAdapter.allBands().then(bands => this.setState({ bands: bands }))
  }

  retrieveAllArtists() {
    UserAdapter.allArtists().then(artists => this.setState({artists}))
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

  publicProfile(routerProps) {
    const id = routerProps.match.params.id
    const users = this.state.bands.concat(this.state.artists)
    const user = users.find(u => u.user.id === parseInt(id, 10))
    return <UserProfile user={user}/>
  }

  render() {
    if (this.state.bands.length === 0) {
      return <div>Loading...</div>
    }

    return (
      <Container fluid>
        <Switch>
          <Route exact path='/profile' render={() => {
            const id = this.props.currentUser.id
            const users = this.state.bands.concat(this.state.artists)
            const user = users.find(u => u.user.id === parseInt(id, 10))
            return <CurrentUserProfile user={user} deleteAccount={this.deleteAccount}/>
          }}/>
          <Route exact path='/:id' render={(routerProps) => { this.publicProfile(routerProps) }}/>
          <Route exact path='/' render={() => <UserList bands={this.state.bands} artists={this.state.artists}/>}/>
        </Switch>
      </Container>
    )
  }
}
