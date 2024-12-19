import fetchPokemon from "../services/pokemonApi";

const useFetchPokemon = async (setError, setLoading, difficulty) => {
 setLoading(true);
 try {
  const pokemonTotal = await fetchPokemon("pokemon?limit=1&offset=0");

  const randomIds = new Set();
  while (randomIds.size < difficulty) {
   let getRandomId = Math.floor(Math.random() * pokemonTotal.count + 1);
   if (getRandomId > 1025) {
    getRandomId = 10001 + (getRandomId - 1026);
   }
   randomIds.add(getRandomId);
  }

  const fetchPromises = Array.from(randomIds).map((id) =>
   fetchPokemon(`pokemon/${id}`)
  );
  const randomPokemon = await Promise.all(fetchPromises);

  return randomPokemon;
 } catch (error) {
  setError(error.message);
  return null;
 } finally {
  setLoading(false);
 }
};

export default useFetchPokemon;
