import React, {Component} from 'react';
import '../styles/login.css';
import {Col, Row, Button} from 'reactstrap';

class LoginForm extends Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state)
    this.setState({username: '', password: ''})
  }

  render() {
    return (
      <Col sm={{
        size: 12,
        offset: 3
      }} className='login'>
        <Row><h1>Login</h1></Row>
        <form onSubmit={this.handleSubmit}>
          <Row>
            <Col>
              <input type='text' value={this.state.username} name="username" onChange={this.handleChange} placeholder='Username'/>
            </Col>
          </Row>
          <Row>
            <Col>
              <input type='password' value={this.state.password} name="password" onChange={this.handleChange} placeholder='Password'/>
            </Col>
          </Row>
          <Button size='md' type='submit' block>Log In</Button>
        </form>
      </Col>
    )
  }
}

export default LoginForm
