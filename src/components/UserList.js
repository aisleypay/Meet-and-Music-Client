import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const UserList = (props) => {
  let names = props.userList.map(u => {
    if (u['artists'].length === 0) {
      return <li key={u.id}><Link to={`/${u.id}`}>{u.bands[0].name}</Link></li>
    } else {
      return <li key={u.id}><Link to={`/${u.id}`}>{u.artists[0].name}</Link></li>
    }
  });

  return (
    <ul>
    {names}
    </ul>
  )
}


export default UserList
