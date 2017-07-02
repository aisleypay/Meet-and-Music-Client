import React from 'react';
import { Link } from 'react-router-dom'

// similar to BandList
const ArtistList = ({ artists }) => {
  return (
    <div>
      <h1>Artist</h1>
      <ul>
      {artists.map(u => {
          return <li key={u.user.id}><Link to={`/${u.user.id}`}>{u.name}</Link></li>
      })}
      </ul>
    </div>
  )
}

export default ArtistList;
