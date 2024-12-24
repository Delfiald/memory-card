const setItem = (key, value, setError) => {
 try {
  if (!key) setError("Key is required");
  const serializedValue = JSON.stringify(value);
  localStorage.setItem(key, serializedValue);
 } catch (error) {
  setError("Failed to set item in localStorage:", error);
 }
};

const getItem = (key, setError) => {
 try {
  const serializedValue = localStorage.getItem(key);
  return serializedValue ? JSON.parse(serializedValue) : null;
 } catch (error) {
  setError("Failed to get item from localStorage:", error);
  return null;
 }
};

const removeItem = (key, setError) => {
 try {
  localStorage.removeItem(key);
 } catch (error) {
  setError("Failed to remove item from localStorage:", error);
 }
};

export { setItem, getItem, removeItem };
