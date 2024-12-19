import fetchPokemon from "../services/pokemonApi";

function fetchPokemonData(setError, setLoading) {
 const getTotalPokemon = async (setPokemonTotal) => {
  setLoading(true);
  try {
   const data = await fetchPokemon("pokemon?limit=1&offset=0");
   setPokemonTotal(data);
  } catch (error) {
   setError(error.message);
  } finally {
   setLoading(false);
  }
 };

 const getRandomPokemon = async (difficulty, pokemonTotal) => {
  setLoading(true);
  try {
   if (!pokemonTotal || !pokemonTotal.count) {
    throw new Error("Pokemon total is not set");
   }

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

 return {
  getTotalPokemon,
  getRandomPokemon,
 };
}

export default fetchPokemonData;
