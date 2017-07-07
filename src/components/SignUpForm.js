import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import {InstrumentAdapter, GenreAdapter} from '../adapters';
import PropTypes from 'prop-types';

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instrumentsAll: [],
      genresAll: [],
      username: '',
      password: '',
      type: 'Band',
      name: '',
      state: '',
      zipcode: '',
      radius_preference: 15,
      setList: '',
      selectedLookingTalent: '',
      experience_in_years: 0,
      youtube_playlist_link:'',
      profile_pic: ''
    }
  }

  componentDidMount() {
    InstrumentAdapter.allInstruments().then(instruments => this.setState({instrumentsAll: instruments}))

    GenreAdapter.allGenres().then(genres => this.setState({genresAll: genres}))
  }

  artistOnlyFields = () => {
    if (this.state.type === 'Artist') {
      return (
        <FormGroup>
          <FormGroup>
            <Label for="age">Age</Label>
            <Input type="number" name="age" placeholder="Age" value={this.state.age} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="experience_in_years">Years of Experience</Label>
            <Input type="number" name="experience_in_years" placeholder="Experience" value={this.state.experience_in_years} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="instruments">What Kind of Instruments Do You Play?</Label>
            <Input type="select" name="instruments" id="selectInstruments" multiple>
              {this.state.instrumentsAll.map(i => {
                return <option key={i.id} value={i.id}>{i.name}</option>
              })}
            </Input>
          </FormGroup>
        </FormGroup>
      )
    }
  }

  bandOnlyFields = () => {
    if (this.state.type === 'Band') {
      return (
        <FormGroup>
          <Label for="instruments">What kind of Skills are You Looking For?</Label>
          <Input type="select" name="instruments" id="selectInstruments" multiple>
            {this.state.instrumentsAll.map(i => {
              return <option key={i.id} value={i.id}>{i.name}</option>
            })}
          </Input>
        </FormGroup>
      )
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOptionChange = (e) => {
    this.setState({selectedLookingTalent: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let selectedGenres = [];
    let selectedInstruments = [];

    let htmlOptions = document.getElementById('selectGenres').selectedOptions;
    for (let g in htmlOptions) {
      if (isNaN(parseInt(htmlOptions[g].value, 10)) !== true) {
        selectedGenres.push(parseInt(htmlOptions[g].value, 10))
      }
    }

    let htmlIOptions = document.getElementById('selectInstruments').selectedOptions;
    for (let instr in htmlIOptions) {
      if (isNaN(parseInt(htmlIOptions[instr].value, 10)) !== true) {
        selectedInstruments.push(parseInt(htmlIOptions[instr].value, 10))
      }
    }

    this.props.onSubmit(this.state, selectedGenres, selectedInstruments)
  }

  render() {
    if (this.state.genresAll.length === 0) {
      return <div>Loading....</div>
    }

    return (
      <Col xs='12' sm='12' md={{ size: 10, offset: 2 }} lg={{ size: 8, offset: 2 }} xl={{ size: 8, offset: 2 }} >
        <Form onSubmit={this.handleSubmit} className='sign-up-form'>
          <header>
            <h1>Sign Up for Meet and Music</h1>
          </header>
          <FormGroup>
            <Input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="userType">Are You a Band or an Artist?</Label>
            <Input type="select" name="type" value={this.state.type} onChange={this.handleChange}>
              <option>Band</option>
              <option>Artist</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Input type="text" name="state" placeholder="State" value={this.state.state} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Input type="number" name="zipcode" placeholder="Zipcode" value={this.state.zipcode} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Input type="text" name="youtube_playlist_link" placeholder="YouTube Playlist Embed Link" value={this.state.youtube_playlist_link} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Input type="text" name="profile_pic" placeholder="Profile Pic" value={this.state.profile_pic} onChange={this.handleChange}/>
          </FormGroup>
          {this.artistOnlyFields()}
          <FormGroup tag="fieldset">
            <legend>Are You Actively Looking for Talent?</legend>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="looking_for_musicians_true" value='true' checked={this.state.selectedLookingTalent === 'true'} onChange={this.handleOptionChange}/>{' '}
                  Yes
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="looking_for_musicians_true" value='false' checked={this.state.selectedLookingTalent === 'false'} onChange={this.handleOptionChange}/>{' '}
                    No
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup>
                <Label for="radius_preference">How far out are you looking for Talent?</Label>
                <Input type="number" name="radius_preference" placeholder="Radius" value={this.state.radius_preference} onChange={this.handleChange}/>
              </FormGroup>
              <FormGroup>
                <Label for="setList">Possible/Ideal Set List</Label>
                <Input type="textarea" name="setList" placeholder="Set List" value={this.state.setList} onChange={this.handleChange}/>
              </FormGroup>
              <FormGroup>
                <Label for="genres">What Kind of Music Do You Play?</Label>
                <Input type="select" id="selectGenres" name="genres" onChange={this.handleGenresChange} multiple>
                  {this.state.genresAll.map(g => {
                    return <option key={g.id} value={g.id}>{g.name}</option>
                  })}
                </Input>
              </FormGroup>
              {this.bandOnlyFields()}
              <Button>Submit</Button>
            </Form>

      </Col>
    );
  }
}

SignUpForm.defaultProps = {
  radius_preference: 15,
  type: 'Band',
}

SignUpForm.propTypes = {
  genresAll: PropTypes.arrayOf(PropTypes.string).isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zipcode: PropTypes.string.isRequired,
  radius_preference: PropTypes.number.isRequired,
}
