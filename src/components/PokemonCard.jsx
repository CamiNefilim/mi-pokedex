import "../styles/PokemonCard.css";
import PropTypes from "prop-types";

function PokemonCard({ pokemon, selectedType }) {

  if (!pokemon) return null;

  return (
    <div className="card details p-3 m-1 shadow rounded-3">
      
      <div className="d-flex justify-content-between">
        <span className="text-muted">N.º {pokemon.id.toString().padStart(4, "0")}</span>
        <div>
          <span className="badge text-secondary me-1">❤️ {pokemon.stats[0].base_stat} HP</span>
        </div>
      </div>
      
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        className="img-fluid pokemon-image"
        alt={pokemon.name}
      />

      <h2 className="text-capitalize mb-0 text-center">{pokemon.name}</h2>
      
      <hr></hr>

      <div className="d-flex flex-wrap align-items-center justify-content-center mb-2">
        <span className="badge bg-success mt-2 me-2">📏 {pokemon.height / 10} m</span>
        <span className="badge bg-info mt-2 me-2">⚖️ {pokemon.weight / 10} kg</span>
        {pokemon.types.map((type) => (
          <span key={`tag-${type.type.name}`} className={`badge bg-${type.type.name} mt-2 me-2`}>
            {type.type.name.toUpperCase()}
          </span>
        ))}
      </div>

      {pokemon.stats.map((stat) => (
        <div key={stat.stat.name} className="mb-2 ms-3 me-3">
          <span className="text-capitalize">{stat.stat.name.replace("-", " ")}</span>
          <div className="progress mt-2">
            <div
              className={`progress-bar bg-${selectedType}`} 
              role="progressbar"
              style={{ width: `${(stat.base_stat / 150) * 100}%` }}
              aria-valuenow={stat.base_stat}
              aria-valuemin="0"
              aria-valuemax="150"
            > {`${Math.round((stat.base_stat / 150) * 100)}%`}</div>
          </div>
        </div>
      ))}

    </div>    
  );
}

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    sprites: PropTypes.shape({
      other: PropTypes.shape({
        "official-artwork": PropTypes.shape({
          front_default: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    stats: PropTypes.arrayOf(
      PropTypes.shape({
        base_stat: PropTypes.number.isRequired,
        stat: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
    types: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
  selectedType: PropTypes.string.isRequired
  };

export default PokemonCard;
