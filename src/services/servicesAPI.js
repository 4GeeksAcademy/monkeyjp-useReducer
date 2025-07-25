export const getPersonajes = async (dispatch) => {
    const response = await fetch("https://verbose-computing-machine-g747pp45rjx3vvp4-8000.app.github.dev/usuarios/monkey/personajes")
		console.log(response);
		if (!response.ok) {
			console.log("debo crear el usuario");
			crearUsuario()
			return
		}
		const data = await response.json()
		console.log(data);
		dispatch({type: 'set_personajes', payload: data})
}

export const crearPersonaje = async (dispatch, newPersonaje, navigate) => {
		const response = await fetch("https://verbose-computing-machine-g747pp45rjx3vvp4-8000.app.github.dev/usuarios/monkey/personajes", {
			method: "POST",
			body: JSON.stringify(newPersonaje),
			headers: {
				"Content-Type": "application/json"
			}
		})
		const data = await response.json()
		console.log(data);
		getPersonajes(dispatch)
		navigate("/")

	}

export const editPersonaje = async (dispatch,id, newPersonaje, navigate) => {
		const response = await fetch(`https://verbose-computing-machine-g747pp45rjx3vvp4-8000.app.github.dev/usuarios/monkey/personajes/${id}`, {
			method: "PUT",
			body: JSON.stringify(newPersonaje),
			headers: {
				"Content-Type": "application/json"
			}
		})
		const data = await response.json()
		console.log(data);
		if (response.ok) {
			navigate("/")
		}
		

	}