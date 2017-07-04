import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';

const DecisionList = ({ decisions, recs, title }) => {
  const usersIds = decisions.map(d => d.chosen_id)
  const people = recs.filter(r => usersIds.includes(r.user.id))
  debugger
  return (
    <section>
      <Link to='/profile'>Back to Profile</Link>
      <header><h1>{title}</h1></header>
      <Table hover bordered responsive>
        <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Decision Date</th>
        </tr>
        </thead>
        <tbody>
          {people.map(p => {
            return (
              <tr>
                <td><img className= 'decision-pic' src={p.profile_pic} alt='Broken Link'/> {p.name}</td>
                <td>Email</td>
                <td>{decisions.find(d => d.chosen_id === p.user.id).created_at}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </section>
  )
}

export default DecisionList;
