import "../styles/PokemonList.css";
import { usePokemonList } from "../hooks/usePokemonList";
import PokemonModal from "./PokemonModal";
import { types } from "../constants";
import { PuffLoader } from "react-spinners";

function PokemonList() {
  const { pokemons, selectedType, setSelectedType, selectedPokemon, setSelectedPokemon, loading, hasMore } = usePokemonList();
  
  return (
    <div className="container mt-4">
      <div className="text-center">
        <img
          src={`${import.meta.env.BASE_URL}images/pokedex_logo.png`}
          alt="Pokédex"
          className="img-fluid"
          style={{ maxWidth: "300px" }}
        />
      </div>

      <div className="text-center my-3">
        {types.map((type) => (
          <button
            key={type.name}
            className={`btn mx-2 mt-2 ${selectedType === type.name ? type.color : "btn-outline-dark"}`}
            onClick={() => {
              setSelectedType(type.name); // Limpiar la lista
            }}
          >
            <i className={`${type.icon} me-1`}></i>
            {type.text.toUpperCase()}
          </button>
        ))}
      </div>
      
      {/* Lista de Pokémon */}
      <div className="row mt-4">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="col-lg-4 col-md-6 col-sm-6">
            <article className='poke-card'>
              <header className='poke-card-header'>
                <img
                  className='poke-card-avatar'
                  src={pokemon.sprites.front_default ? pokemon.sprites.front_default : `${import.meta.env.BASE_URL}images/default_pokemon.png` } 
                  alt={pokemon.name}
                  onError={(e) => e.target.src = `${import.meta.env.BASE_URL}images/default_pokemon.png`}
                />
                <div className='poke-card-info'>
                  <strong className="poke-card-infoName text-capitalize">{pokemon.name}</strong>
                  <span className='poke-card-id'>N.°{String(pokemon.id).padStart(4, "0")}</span>
                </div>
              </header>

              <aside>
                <button className="poke-card-button" data-bs-toggle="modal" data-bs-target="#pokemonModal" onClick={() => setSelectedPokemon(pokemon)}>
                  <span className='poke-card-text'>Ver más</span>
                </button>
              </aside>
            </article>            
          </div>
        ))}
      </div>
      {loading && <div className="loader-container"><PuffLoader color="#383297" size={80} /></div>}
      {!hasMore && <p className="text-center text-secondary m-4">No hay más Pokémon para mostrar</p>}

      <PokemonModal selectedPokemon={selectedPokemon} selectedType={selectedType} />
    </div>
  );
}

export default PokemonList;
