export const blogApi = async (page) => {
  const API_KEY = ''; // Leave empty or use a valid one if needed
  const response = await fetch(`https://dummyjson.com/products?limit=5&skip=${(page - 1) * 5}`, {
    headers: { 'X-Api-Key': API_KEY }
  });

  if (!response.ok) throw new Error("Failed to fetch blogs");
  const data = await response.json();

  // Return only the products array
  return data.products;
};
