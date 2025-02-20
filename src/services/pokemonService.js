export const fetchPokemonByType = async (type, limit) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await response.json();
  
      const totalAvailable = data.pokemon.length;
      const pokemonUrls = data.pokemon.slice(0, limit).map((p) => p.pokemon.url);
  
      const pokemonDetails = await Promise.all(
        pokemonUrls.map(async (url) => {
          const res = await fetch(url);
          return res.json();
        })
      );
  
      return {
        pokemons: pokemonDetails,
        hasMore: limit < totalAvailable
      };
    } catch (error) {
      console.error("Error al obtener Pokémon:", error);
      return { pokemons: [], hasMore: false };
    }
  };