import React from 'react';
import BandList from './BandList'
import ArtistList from './ArtistList'


const UserList = ({ bands, artists }) => {

  return (
    <div>
      <BandList bands={bands} />
      <ArtistList artists={artists} />
    </div>

  )
}

export default UserList
