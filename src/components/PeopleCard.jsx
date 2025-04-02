import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

const PeopleCard = ({ item }) => {
    const { store, dispatch } = useGlobalReducer();
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/people/${item.uid}`);
                if (!response.ok) throw new Error("Error fetching character details");
                const data = await response.json();
                setDetails(data.result.properties); // ✅ Guardamos los detalles en el estado
            } catch (error) {
                console.error(error);
            }
        };

        fetchDetails();
    }, [item.uid]);

    const addToFavorites = (id, name) => {
        dispatch({ type: "add_to_favorite", payload: { uid: Number(id), name } });
    };

    const isFavorite = (name)=>{
        const result = store.favorites.find(item => item.name == name) 
        return result 
    }

    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src="https://picsum.photos/200/200" className="card-img-top" alt="People card" />
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>

                {details ? (
                    <>
                        <p><strong>Height:</strong> {details.height} cm</p>
                        <p><strong>Mass:</strong> {details.mass} kg</p>
                        <p><strong>Hair Color:</strong> {details.hair_color}</p>
                    </>
                ) : (
                    <p>Loading details...</p> // ✅ Mientras se cargan los datos
                )}

                <div className="d-flex justify-content-between">
                    <Link to={`/character-details/${item.uid}`} className="btn btn-primary">
                        Learn more!
                    </Link>
                    <button className="btn btn-primary" onClick={() => addToFavorites(item.uid, item.name)}>
                        <i className={`${isFavorite(item.name) ? "fa-solid fa-heart text-danger" : "fa-regular fa-heart"}`}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PeopleCard;
