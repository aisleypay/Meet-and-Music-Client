import React from 'react';
import {withRouter} from 'react-router-dom';

export default function withAuth(WrappedComponent) {
  class withAuth extends React.Component {
    componentDidMount() {
      if (!localStorage.getItem('jwt')) {
        this.props.history.push('/login')
      } else {
        fetch('http://localhost:3000/api/v1/current_user', {
          headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'Authorization': localStorage.getItem('jwt')
          }
        }).then(res => res.json()).then(user => {
          if (user.error) {
            this.props.history.push('/login')
          }
        })
      }
    }

    render() {
      return <WrappedComponent {...this.props}/>
    }
  }
  return withRouter(withAuth)
}
