import PokemonList from "../components/PokemonList";

function Home() {
  return (
    <div>
      <div className="text-center mt-4">
        <img
          src={`${import.meta.env.BASE_URL}images/pokedex_logo.png`}
          alt="Pokédex"
          className="img-fluid"
          style={{ maxWidth: "300px" }}
        />
      </div>
      <PokemonList />
    </div>
  );
}

export default Home;
