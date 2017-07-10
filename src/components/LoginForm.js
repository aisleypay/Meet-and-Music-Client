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
      <Row>
        <Col className='form' sm={{ size: 12 }}>
          <Row className='login'>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
              <input type='text' value={this.state.username} name="username" onChange={this.handleChange} placeholder='Username'/>
              <input type='password' value={this.state.password} name="password" onChange={this.handleChange} placeholder='Password'/>
              <Row>
                <Col className='login-submit'>
                  <Button size='md' type='submit' block>Log In</Button>
                </Col>
              </Row>
            </form>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default LoginForm
