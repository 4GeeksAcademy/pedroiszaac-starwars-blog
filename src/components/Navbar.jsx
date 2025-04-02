import { Link } from "react-router-dom";
import starwars from "../assets/img/hd-white-star-wars-logo.png";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	// ✅ Función para eliminar un favorito
	const removeFromFavorites = (uid) => {
		dispatch({ type: "remove_favorite", payload: { uid } });
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<img src={starwars} className="logo-top" alt="Logo" />
				</Link>
				<div className="ml-auto">
					<div className="dropdown">
						<button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Favorites <span className="badge text-bg-secondary">{store.favorites.length}</span>
						</button>
						<ul className="dropdown-menu">
							{store.favorites.length === 0 ? (
								<li className="dropdown-item text-muted">No favorites yet</li>
							) : (
								store.favorites.map((item) => (
									<li key={item.uid} className="dropdown-item d-flex justify-content-between align-items-center">
										{item.name}
										<button className="btn btn-danger btn-sm" onClick={() => removeFromFavorites(item.uid)}>
											<i className="fa-solid fa-trash"></i>
										</button>
									</li>
								))
							)}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};
