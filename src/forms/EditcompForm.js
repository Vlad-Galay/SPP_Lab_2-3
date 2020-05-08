import React, { useState, useEffect } from 'react'

const EditcompForm = props => {
  const [ comp, setcomp ] = useState(props.currentcomp)

  useEffect(
    () => {
      setcomp(props.currentcomp)
    },
    [ props ]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target

    setcomp({ ...comp, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updatecomp(comp.id, comp)
      }}
    >
      <label>Mark</label>
      <input type="text" name="mark" value={comp.mark} onChange={handleInputChange} />
      <label>Model</label>
      <input type="text" name="model" value={comp.model} onChange={handleInputChange} />
      <label>Year</label>
      <input type="text" name="year" value={comp.year} onChange={handleInputChange} />
      <button>Update computer</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditcompForm
