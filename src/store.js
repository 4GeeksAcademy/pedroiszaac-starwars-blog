export const initialStore = () => {
  return {
    people: [],
    planets: [],
    favorites: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_people_data":
      return {
        ...store,
        people: [...action.payload.results]
      };

    case "set_planets_data":
      return {
        ...store,
        planets: [...action.payload.results]
      };

    case "add_to_favorite":
      const { uid, name } = action.payload;
      const isFavorite = store.favorites.some(item => item.uid === uid);
      if (isFavorite) {
        return store; // Evitamos duplicados
      }
      return {
        ...store,
        favorites: [...store.favorites, { uid, name }]
      };

    case "remove_favorite": // ✅ Nuevo caso para eliminar favoritos
      return {
        ...store,
        favorites: store.favorites.filter(item => item.uid !== action.payload.uid)
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
