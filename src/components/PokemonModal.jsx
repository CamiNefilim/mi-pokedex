function PokemonModal({ selectedPokemon }) {
    return (
      <div
        className="modal fade"
        id="pokemonModal"
        tabIndex="-1"
        aria-labelledby="pokemonModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-capitalize" id="pokemonModalLabel">
                {selectedPokemon?.name || "Cargando..."}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body text-center">
              {selectedPokemon ? (
                <>
                  <img
                    src={selectedPokemon.sprites.front_default ? selectedPokemon.sprites.front_default : "/images/default_pokemon.png" }
                    alt={selectedPokemon.name}
                    className="img-fluid"
                    onError={(e) => e.target.src = "/images/default_pokemon.png"}
                  />
                  <p>Peso: {selectedPokemon.weight}</p>
                  <p>Altura: {selectedPokemon.height}</p>
                </>
              ) : (
                <p>Selecciona un Pokemon para ver más detalles</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default PokemonModal;
  