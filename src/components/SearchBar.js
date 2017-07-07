import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';
import {InstrumentAdapter, GenreAdapter} from '../adapters';
import PropTypes from 'prop-types';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instrumentsAll: [],
      genresAll: [],
      selectedUserType: '',
      instrumentSelected: 'All',
      genreSelected: 'All',
      zipcode: '',
      radius: 15
    }
  }

  componentDidMount() {
    InstrumentAdapter.allInstruments().then(instruments => this.setState({instrumentsAll: instruments}))
    GenreAdapter.allGenres().then(genres => this.setState({genresAll: genres}))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSearch(this.state)
  }

  handleOptionChange = (e) => {
    this.setState({selectedUserType: e.target.value});
  }

  render() {
    return (
      <Col className='search-bar'>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup tag="fieldset">
            <p>Artist or Band?</p>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="band" value='Band' checked={this.state.selectedUserType === 'Band'} onChange={this.handleOptionChange}/>{' '}
                Band
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="artist" value='Artist' checked={this.state.selectedUserType === 'Artist'} onChange={this.handleOptionChange}/>{' '}
                Artist
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <Label for="instruments">Select an Instrument</Label>
            <Input type="select" name="instrumentSelected" onChange={this.handleChange}>
              {this.state.instrumentsAll.map(i => {
                return <option key={i.id + i.name} value={i.id}>{i.name}</option>
              }).concat(
                <option key='All' value={'All'}>All</option>
              )}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="genres">Select a Genre</Label>
            <Input type="select" name="genreSelected" onChange={this.handleChange}>
              {this.state.genresAll.map(g => {
                return <option key={g.id + g.name} value={g.id}>{g.name}</option>
              }).concat(
                <option key='All' value={'All'}>All</option>
              )}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="radius">Radius {this.state.radius} Miles</Label>
            <Input type="range" name="radius" min="0" max="50" id="radius" step="1" onChange={this.handleChange} value={this.state.radius}></Input>
          </FormGroup>
          <FormGroup>
            <Input type="search" name="zipcode" placeholder="Search Zipcode" value={this.state.zipcode} onChange={this.handleChange}/>
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </Col>
    )
  }
}

SearchBar.defaultProps = {
  zipcode: '07067',
  radius: 15,
  selectedUserType: 'Band',
  instrumentSelected: 'All',
  genreSelected: 'All'
}

SearchBar.propTypes = {
  zipcode: PropTypes.string.isRequired,
  radius: PropTypes.number.isRequired,
  selectedUserType: PropTypes.string.isRequired,
  instrumentSelected: PropTypes.string.isRequired,
  genreSelected: PropTypes.string.isRequired
}
