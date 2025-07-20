import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { crearPersonaje, editPersonaje } from "../services/servicesAPI";

export const AddEditContact = () => {

    const { id } = useParams()

    const navigate = useNavigate()

    const { store, dispatch } = useGlobalReducer()

    const [newPersonaje, setNewPersonaje] = useState({
        nombre: "",
        frase: "",
        imagen: ""
    })
    const [isEditing, setIsEditing] = useState(false)
    const [showAlert, setShowAlert] = useState(false);

    const handleInputsChange = (e) => {
        setNewPersonaje({ ...newPersonaje, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newPersonaje.nombre || !newPersonaje.frase || !newPersonaje.imagen) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
            return;
        }
        if (isEditing) {
            editPersonaje(dispatch, id, newPersonaje, navigate)
        }else{
            crearPersonaje(dispatch, newPersonaje, navigate)

        }

    }

    useEffect(() => {
        if (id) {
            setNewPersonaje(store.personajes.filter(personaje => personaje.id == id)[0])
            setIsEditing(true)
        } else {
            setIsEditing(false)
            setNewPersonaje({
                nombre: "",
                frase: "",
                imagen: ""
            })
        }
    }, [id])

    return (
        <div className="container pt-4">
            <h2 className="text-center text-light"><img style={{ height: "40px" }} src="https://upload.wikimedia.org/wikipedia/commons/d/d4/One_Ring_Blender_Render.png" alt="" /> Crea tu personaje de El Señor de los Anillos</h2>

            {showAlert && (
                <div className="alert alert-warning" role="alert">
                    Todos los campos son obligatorios
                </div>
            )}

            <form className="mb-5" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nombre"
                    name="nombre"
                    value={newPersonaje.nombre}
                    onChange={handleInputsChange}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Frase"
                    name="frase"
                    value={newPersonaje.frase}
                    onChange={handleInputsChange}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="URL de la imagen"
                    value={newPersonaje.imagen}
                    name="imagen"
                    onChange={handleInputsChange}
                />
                <button className="btn btn-success w-100">{isEditing ? "Edit Character" : "Add Character"}</button>
            </form>
        </div>
    )
}