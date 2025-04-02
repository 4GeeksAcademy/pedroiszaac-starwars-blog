import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import universeImage from "../assets/img/universe.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import PeopleCard from "../components/PeopleCard.jsx";
import Planets from "../components/Planets.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer();

	const getPeople = async () => {
		try {
			const response = await fetch("https://www.swapi.tech/api/people");

			if (!response.ok) {
				throw new Error("Ocurrió un error al llamar el endpoint 'people' ");
			}

			const data = await response.json();

			dispatch({ type: "set_people_data", payload: data }); // ✅ Coincide con el reducer
		} catch (error) {
			console.log(error);
		}
	};

	const getPlanets = async () => {
		try {
			const response = await fetch("https://www.swapi.tech/api/planets");

			if (!response.ok) {
				throw new Error("Ocurrió un error al llamar el endpoint 'planets' ");
			}

			const data = await response.json();

			dispatch({ type: "set_planets_data", payload: data }); // ✅ Coincide con el reducer
		} catch (error) {
			console.log(error);
		}
	};


	useEffect(() => {
		getPeople();
	}, []);
	useEffect(() => {
		getPlanets();
	}, []);
	return (
		<div className="text-center mt-5">
			<h2 className="text-center text-primary mb-4">Characters List</h2>
			<div className="d-flex flex-row overflow-auto">
				{store.people.map((item, index) => {
					return (
						<div key={item.uid} className="col-md-4 mb-4">
							<PeopleCard key={item.uid} item={item} />
						</div>
					)
				})}
			</div>
			<h2 className="text-center text-primary mb-4">Planets List</h2>
			<div className="d-flex flex-row overflow-auto">
				{store.planets.map((item) => (
					<div key={item.uid} className="col-md-4 mb-4">
						<Planets item={item} /> {/* ✅ Pasamos item como prop */}
					</div>
				))}
			</div>
		</div>
	)
}; 
