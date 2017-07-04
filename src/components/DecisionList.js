import React from 'react';

const DecisionList = ({ users }) => {
  debugger
  return (
    <section>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Decision Date</th>
        </tr>
        </thead>
        <tbody>
          {users.map(u => {
            return (
              <tr>
                <td>{u.name}</td>
                <td>Email</td>
                <td>{u.created_at}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}

export default DecisionList;
