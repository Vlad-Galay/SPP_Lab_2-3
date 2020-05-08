import React, { useState, Fragment } from 'react'
import AddcompForm from './forms/AddcompForm'
import EditcompForm from './forms/EditcompForm'
import UserTable from './tables/UserTable'
import Sample from './sample'


let firstInit = false;

let App = () => {



	let [ compInfo, setUserInfo] = useState({isAuth : localStorage.getItem("token") != null, nick : localStorage.getItem("nick"), token : localStorage.getItem("token")})



	// Data
	let compsData = [];

	if (firstInit !== true && compInfo.isAuth){
		fetch('http://localhost:3003/api/comps', {
			method : "GET",
			headers: new Headers({
				'Accept': 'application/json',
				'Authorization' : compInfo.token
			})
		}).then(response => {
			if (response.status === 200){
				response.json().then(data => {
					setcomps(data);
				})
				firstInit = true;
			}
			else if (response.status === 401) {
				localStorage.removeItem("nick");
				localStorage.removeItem("token");
				alert("You need to authorize");
				setcomps([]);
				setUserInfo({isAuth : false, nick : "", token : ""});
			}
		})
	}

		let initialFormState = { id: null, mark: '', model: '', year: ''}

		// Setting state
		let [ comps, setcomps ] = useState(compsData)
		let [ currentcomp, setCurrentcomp ] = useState(initialFormState)
		let [ editing, setEditing ] = useState(false)
		
		
		


	
	let addcomp = comp => {
		comp.id = comps.length + 1
		//setcomps([ ...comps, comp ])


		let json = JSON.stringify({id : comp.id, mark : comp.mark, model : comp.model, year : comp.year, token : compInfo.token})

		fetch('http://localhost:3003/api/comps', {
			method : "POST",
			headers: new Headers({
				'Accept': 'application/json',
				'Authorization' : compInfo.token,
				'Content-Type' : 'application/json'
			}),
			body : json
		}).then(response => {
			if (response.status === 401) {
				localStorage.removeItem("nick");
				localStorage.removeItem("token");
				alert("You need to authorize");
				setcomps([]);
				setUserInfo({isAuth : false, nick : "", token : ""});
			}
			else if (response.status === 200){
				fetch('http://localhost:3003/api/comps', {
					method : "GET",
					headers: new Headers({
						'Accept': 'application/json',
						'Authorization' : compInfo.token
					})
				}).then(response => {
					if (response.status === 200){
						response.json().then(data => {
							setcomps(data);
						})
					}
					else if (response.status === 401) {
						localStorage.removeItem("nick");
						localStorage.removeItem("token");
						alert("You need to authorize");
						setcomps([]);
						setUserInfo({isAuth : false, nick : "", token : ""});
					}
				})
			}
		})

	}

	let deletecomp = id => {
		setEditing(false)


		fetch("http://localhost:3003/api/comps/" + id, {
			method : "DELETE",
			headers: new Headers({
				'Accept': 'application/json',
				'Authorization' : compInfo.token,
				'Content-Type' : 'application/json'
			})
		}).then(response => {
			if (response.status === 401) {
				localStorage.removeItem("nick");
				localStorage.removeItem("token");
				alert("You need to authorize");
				setcomps([]);
				setUserInfo({isAuth : false, nick : "", token : ""});
			}
			else if (response.status === 200) {
				fetch('http://localhost:3003/api/comps', {
					method : "GET",
					headers: new Headers({
						'Accept': 'application/json',
						'Authorization' : compInfo.token
					})
				}).then(response => {
					if (response.status === 200){
						response.json().then(data => {
							setcomps(data);
						})
					}
					else if (response.status === 401) {
						localStorage.removeItem("nick");
						localStorage.removeItem("token");
						alert("You need to authorize");
						setcomps([]);
						setUserInfo({isAuth : false, nick : "", token : ""});
					}
				})
			}
		})

	}

	let updatecomp = (id, updatedcomp) => {
		setEditing(false)

		let json = JSON.stringify({id : updatedcomp.id, mark : updatedcomp.mark, model : updatedcomp.model, year : updatedcomp.year, token : compInfo.token})

		fetch('http://localhost:3003/api/comps', {
			method : "PUT",
			headers: new Headers({
				'Accept': 'application/json',
				'Authorization' : compInfo.token,
				'Content-Type' : 'application/json'
			}),
			body : json
		}).then(response => {
			if (response.status === 401) {
				localStorage.removeItem("nick");
				localStorage.removeItem("token");
				alert("You need to authorize");
				setcomps([]);
				setUserInfo({isAuth : false, nick : "", token : ""});
			}
			else if (response.status === 200){
				fetch('http://localhost:3003/api/comps', {
					method : "GET",
					headers: new Headers({
						'Accept': 'application/json',
						'Authorization' : compInfo.token
					})
				}).then(response => {
					if (response.status === 200){
						response.json().then(data => {
							setcomps(data);
						})
					}
					else if (response.status === 401) {
						localStorage.removeItem("nick");
						localStorage.removeItem("token");
						alert("You need to authorize");
						setcomps([]);
						setUserInfo({isAuth : false, nick : "", token : ""});
					}
				})
			}
		})
	}

	let editRow = comp => {
		setEditing(true)

		setCurrentcomp({ id: comp.id, mark: comp.mark, model: comp.model, year: comp.year })
	}

	let qw = (x) => {
		localStorage.setItem("nick", x.nick);
		localStorage.setItem("token", x.token);
		setUserInfo(x);
	}

	let OnLogOut = () => {
		localStorage.removeItem("nick");
		localStorage.removeItem("token");
		firstInit = false;
		setcomps([]);
		setUserInfo({isAuth : false, nick : "", token : ""});
	}

	return (
		<div className="container">	
			

			{
				compInfo.isAuth ? 
					(<div>
						Hello, {compInfo.nick}
						<br></br>
						<button onClick={OnLogOut}> LogOut </button>
					</div>
					)
						: 
					<Sample handle={qw}/>
			}
			<h1>Computer management</h1>
			<div>
				<div>
					{editing ? (
						<Fragment>
							<h2>Edit computer</h2>
							<EditcompForm
								editing={editing}
								setEditing={setEditing}
								currentcomp={currentcomp}
								updatecomp={updatecomp}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add computer</h2>
							<AddcompForm addcomp={addcomp} />
						</Fragment>
					)}
				</div>
				<div>
					<h2>Computer table</h2>
					<UserTable comps={comps} editRow={editRow} deletecomp={deletecomp} />
				</div>
			</div>
		</div>
	)
}

export default App
