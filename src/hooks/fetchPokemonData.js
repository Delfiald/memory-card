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

 const getRandomPokemon = async (difficulty, pokemonTotal, setIsFetching) => {
  setLoading(true);
  const LOADING_TIME = 4000;
  const startTime = Date.now();

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
   const endTime = Date.now();
   const elapsedTime = endTime - startTime;
   const delay = Math.max(LOADING_TIME - elapsedTime, 0);

   setTimeout(() => {
    setLoading(false);
    setIsFetching(false);
   }, delay);
  }
 };

 return {
  getTotalPokemon,
  getRandomPokemon,
 };
}

export default fetchPokemonData;
