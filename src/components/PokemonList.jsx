import { useState, useEffect } from "react";
import PokemonModal from "./PokemonModal";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedType, setSelectedType] = useState("fire");
  const [limit, setLimit] = useState(12);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const types = [
    { name: "fire", text: "Fuego", color: "btn-danger", icon: "bi bi-fire" },
    { name: "water", text: "Agua", color: "btn-primary", icon: "bi bi-droplet" },
    { name: "grass", text: "Planta", color: "btn-success", icon: "bi bi-tree-fill" },
    { name: "electric", text: "Eléctrico", color: "btn-warning", icon: "bi bi-lightning" },
  ];

  useEffect(() => {
    if (!selectedType) return;

    setLoading(true);
    setHasMore(true);

    fetch(`https://pokeapi.co/api/v2/type/${selectedType}`)
      .then((res) => res.json())
      .then((data) => {
        const totalAvailable = data.pokemon.length;
        const pokemonUrls = data.pokemon.slice(0, limit).map((p) => p.pokemon.url);

        Promise.all(pokemonUrls.map((url) => fetch(url).then((res) => res.json())))
          .then((pokemonDetails) => {
            setPokemons(pokemonDetails);
            setLoading(false);
            setHasMore(limit < totalAvailable); // Si el límite es menor que el total, hay más Pokémon
          });
      });
  }, [selectedType, limit]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        !loading &&
        hasMore
      ) {
        setLimit((prevLimit) => prevLimit + 12);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="container mt-4">
      <div className="text-center">
        <img
          src="/images/pokedex_logo.png"
          alt="Pokédex"
          className="img-fluid"
          style={{ maxWidth: "300px" }}
        />
      </div>

      <div className="text-center my-3">
        {types.map((type) => (
          <button
            key={type.name}
            className={`btn mx-2 ${selectedType === type.name ? type.color : "btn-outline-dark"}`}
            onClick={() => {
              setSelectedType(type.name);
              setLimit(12); // Reiniciar la carga
              setPokemons([]); // Limpiar la lista
            }}
          >
            <i className={`${type.icon} me-1`}></i>
            {type.text.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="row mt-4">
        {pokemons.map((pokemon, index) => (
            <div key={index} className="col-12 col-md-3">
              <div className="card mb-3">
                <div className="card-body text-center">
                  <img
                    src={pokemon.sprites.front_default ? pokemon.sprites.front_default : "/images/default_pokemon.png" } 
                    alt={pokemon.name}
                    className="img-fluid"   
                    onError={(e) => e.target.src = "/images/default_pokemon.png"}                 
                  />
                  <h5 className="card-title text-capitalize mt-2">
                    {pokemon.name}
                  </h5>
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#pokemonModal"
                    onClick={() => setSelectedPokemon(pokemon)}
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      {loading && <p className="text-center mt-3">Cargando más Pokémon...</p>}
      {!hasMore && <p className="text-center mt-3 text-muted">No hay más Pokémon disponibles</p>}

      <PokemonModal selectedPokemon={selectedPokemon} />
    </div>
  );

}

export default PokemonList;
