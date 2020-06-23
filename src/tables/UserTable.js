import React from 'react'

const UserTable = props => (
  <table>
    <thead>
      <tr>
        <th>Mark</th>
        <th>Model</th>
        <th>Year</th>
      </tr>
    </thead>
    <tbody>      
      {props.comps.length > 0 ? (
        props.comps.map(comp => (
          <tr key={comp.id}>
            <td>{comp.mark}</td>
            <td>{comp.model}</td>
            <td>{comp.year}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(comp)
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <button
                onClick={() => props.deletecomp(comp.id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4}>No computers</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default UserTable
