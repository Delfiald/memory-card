const BASE_URL = "https://pokeapi.co/api/v2/";

async function fetchPokemon(request) {
 const response = await fetch(`${BASE_URL}${request}`);
 if (!response.ok) {
  throw new Error("Failed to fetch Pokemon Data");
 }

 return response.json();
}

export default fetchPokemon;
