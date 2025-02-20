import { useState, useEffect } from "react";
import { fetchPokemonByType } from "../services/pokemonService"; // Importar el servicio

export function usePokemonList(initialType = "fire", initialLimit = 16) {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedType, setSelectedType] = useState(initialType);
  const [limit, setLimit] = useState(initialLimit);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Fetch de Pokémon según tipo y límite
  useEffect(() => {
    if (!selectedType) return;

    setLoading(true);
    setHasMore(true);

    fetchPokemonByType(selectedType, limit).then(({ pokemons, hasMore }) => {
      setPokemons(pokemons);
      setHasMore(hasMore);
      setLoading(false);
    });
  }, [selectedType, limit]);

  // Manejo de scroll infinito
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

  return { pokemons, selectedType, setSelectedType, selectedPokemon, setSelectedPokemon, limit, loading, hasMore };
}
