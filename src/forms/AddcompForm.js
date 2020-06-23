import React, { useState } from 'react'

const AddcompForm = props => {
	const initialFormState = { id: null, mark: '', model: '', year: ''}
	const [ comp, setcomp ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setcomp({ ...comp, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!comp.mark || !comp.model || !comp.year) return

				props.addcomp(comp)
				setcomp(initialFormState)
			}}
		>
			<label>Mark</label>
			<input type="text" name="mark" value={comp.mark} onChange={handleInputChange} />
			<label>Model</label>
			<input type="text" name="model" value={comp.model} onChange={handleInputChange} />
			<label>Year</label>
			<input type="text" name="year" value={comp.year} onChange={handleInputChange} />
			<button>Add new computer</button>
		</form>
	)
}

export default AddcompForm
