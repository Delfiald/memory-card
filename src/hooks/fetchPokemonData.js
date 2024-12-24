import fetchPokemon from "../services/pokemonApi";

function fetchPokemonData(setError, setLoading) {
 const getRandomPokemon = async (difficulty, pokemonTotal, setIsFetching) => {
  setLoading(true);
  const LOADING_TIME = 4000;
  const startTime = Date.now();

  try {
   if (!pokemonTotal) {
    throw new Error("Pokemon total is not set");
   }

   const randomIds = new Set();
   while (randomIds.size < difficulty) {
    let getRandomId = Math.floor(Math.random() * pokemonTotal) + 1;
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

 const getDetailPokemon = async (pokemonId) => {
  setLoading(true);

  try {
   const data = await fetchPokemon(`pokemon-species/${pokemonId}`);
   return data;
  } catch (error) {
   setError(error.message);
  } finally {
   setLoading(false);
  }
 };

 return {
  getRandomPokemon,
  getDetailPokemon,
 };
}

export default fetchPokemonData;
