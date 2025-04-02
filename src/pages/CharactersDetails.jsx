import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CharactersDetails = () => {
    const { id } = useParams(); // ✅ Capturamos el ID de la URL
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
                if (!response.ok) throw new Error("Error fetching character data");
                const data = await response.json();
                setCharacter(data.result.properties); // ✅ Guardamos los detalles del personaje
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchCharacter();
    }, [id]);

    if (loading) return <h2 className="text-center">Loading...</h2>;

    return (
        <div className="container mt-5">
            <h1 className="text-center text-primary">{character.name}</h1>
            <div className="card mx-auto" style={{ width: "60rem" }}>
                <img src="https://picsum.photos/200/200" className="card-img-top" alt={character.name} />
                <div className="card-body">
                <div className="row text-center">
                        <div className="col"><strong>Height:</strong></div>
                        <div className="col"><strong>Mass:</strong></div>
                        <div className="col"><strong>Hair Color:</strong></div>
                        <div className="col"><strong>Skin Color:</strong></div>
                        <div className="col"><strong>Eye Color:</strong></div>
                        <div className="col"><strong>Birth Year:</strong></div>
                        <div className="col"><strong>Gender:</strong></div>
                    </div>
                    <div className="row text-center">
                        <div className="col">{character.height} cm</div>
                        <div className="col">{character.mass} kg</div>
                        <div className="col">{character.hair_color}</div>
                        <div className="col">{character.skin_color}</div>
                        <div className="col">{character.eye_color}</div>
                        <div className="col">{character.birth_year}</div>
                        <div className="col">{character.gender}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharactersDetails;
