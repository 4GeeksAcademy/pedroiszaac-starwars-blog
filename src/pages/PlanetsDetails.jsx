import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlanetsDetails = () => {
    const { id } = useParams(); // ✅ Capturamos el ID de la URL
    const [planet, setPlanet] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlanet = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
                if (!response.ok) throw new Error("Error fetching planet data");
                const data = await response.json();
                setPlanet(data.result.properties); // ✅ Guardamos los detalles del planeta
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchPlanet();
    }, [id]);

    if (loading) return <h2 className="text-center">Loading...</h2>;

    return (
        <div className="container mt-5">
            <h1 className="text-center text-primary">{planet.name}</h1>
            <div className="card mx-auto" style={{ width: "60rem" }}>
                <img src="https://picsum.photos/200/200" className="card-img-top" alt={planet.name} />
                <div className="card-body">
                    <div className="row text-center">
                        <div className="col"><strong>Climate:</strong></div>
                        <div className="col"><strong>Terrain:</strong></div>
                        <div className="col"><strong>Population:</strong></div>
                        <div className="col"><strong>Diameter:</strong></div>
                        <div className="col"><strong>Gravity:</strong></div>
                        <div className="col"><strong>Orbital Period:</strong></div>
                        <div className="col"><strong>Rotation Period:</strong></div>
                    </div>
                    <div className="row text-center">
                        <div className="col">{planet.climate}</div>
                        <div className="col">{planet.terrain}</div>
                        <div className="col">{planet.population}</div>
                        <div className="col">{planet.diameter} km</div>
                        <div className="col">{planet.gravity}</div>
                        <div className="col">{planet.orbital_period} days</div>
                        <div className="col">{planet.rotation_period} hours</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanetsDetails;
