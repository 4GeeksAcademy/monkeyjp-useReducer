import { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { crearPersonaje, getPersonajes } from "../services/servicesAPI.js";
import { Link } from "react-router-dom";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

  

	useEffect(() => {
		getPersonajes(dispatch)

	}, [])

	return (
		<div className="container pt-4">
			

			<div className="row">
				{store.personajes.map((p, index) => (
					<div className="col-md-4 mb-4" key={index}>
						<div className="card h-100 shadow">
							<img
								src={p.imagen}
								className="card-img-top"
								alt={p.nombre}
								style={{ height: "300px", objectFit: "cover" }}
							/>
							<div className="card-body">
								<h5 className="card-title">{p.nombre}</h5>
								<p className="card-text fst-italic" style={{height: "60px"}}>"{p.frase}"</p>
								<Link to={`/edit/${p.id}`}>
								<button className="btn btn-dark w-100 ">Edit</button>
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}; 