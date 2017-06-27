import React from 'react';
import { Link } from 'react-router-dom'

const BandList = ({ bands }) => {
  return (
    <div>
      <h1>Bands</h1>
      <ul>
      {bands.map(u => {
          return <li key={u.user.id}><Link to={`/${u.user.id}`}>{u.name}</Link></li>
      })}
      </ul>
    </div>
  )
}

export default BandList;
