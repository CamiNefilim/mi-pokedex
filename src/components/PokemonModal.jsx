import PropTypes from "prop-types";
import PokemonCard from "./PokemonCard";

function PokemonModal({ selectedPokemon, selectedType }) {
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
            <div className="modal-header border-0">
              <h5 className="modal-title text-capitalize" id="pokemonModalLabel">
                {selectedPokemon ? "" : "Cargando..."}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
            {selectedPokemon ? (
              <PokemonCard pokemon={selectedPokemon} selectedType={selectedType} />
            ) : (
              <p>Selecciona un Pokémon para ver más detalles</p>
            )}
          </div>
          </div>
        </div>
      </div>
    );
  }

  PokemonModal.propTypes = {
    selectedPokemon: PropTypes.shape({
      name: PropTypes.string,
      weight: PropTypes.number,
      height: PropTypes.number,
      sprites: PropTypes.shape({
        front_default: PropTypes.string,
      }),
    }),
    selectedType: PropTypes.string
  };
  
  export default PokemonModal;
  