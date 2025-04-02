import React, { useEffect, useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Link } from 'react-router-dom';

const Planets = ({ item }) => { // ✅ Agregamos item como prop
    const { store, dispatch } = useGlobalReducer();

    const [details, setDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/planets/${item.uid}`);
                if (!response.ok) throw new Error("Error fetching planet details");
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
            <img src="https://picsum.photos/200/200" className="card-img-top" alt="Planet card" />
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5> {/* ✅ Ahora item.name no dará error */}
                {details ? (
                    <>
                        <p><strong>Climate:</strong> {details.climate} </p>
                        <p><strong>Terrain:</strong> {details.terrain} </p>
                        <p><strong>Population:</strong> {details.population} </p>
                    </>
                ) : (
                    <p>Loading details...</p> // ✅ Mientras se cargan los datos
                )}
                <div className='d-flex justify-content-between'>
                    <Link to={`/planets-details/${item.uid}`}><button type="button" className="btn btn-primary">Learn more!</button></Link>
                    <button className="btn btn-primary" onClick={() => addToFavorites(item.uid, item.name)}>
                        <i className={`${isFavorite(item.name) ? "fa-solid fa-heart text-danger" : "fa-regular fa-heart"}`}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Planets;
