import axios from "axios";

export interface UnsplashImage {
  id: string;
  urls: { small: string; regular: string };
  alt_description?: string;
}

export interface FetchImagesResponse {
  results: UnsplashImage[];
  total: number;
}

async function fetchImages(searchQuery: string, page: number): Promise<FetchImagesResponse | null> {
  const API_KEY = "qSAP0Ed5oeDMZFtAhn4qZSSeNUXACxN6PoNOd4tcMC4"; // Замените на свой API ключ
  const baseUrl = "https://api.unsplash.com/search/photos/";

  const params = new URLSearchParams({
    query: searchQuery,
    client_id: API_KEY,
    per_page: "12",
    page: page.toString(),
  });

  try {
    const response = await axios.get(`${baseUrl}?${params}`);
    const { results, total } = response.data;
    return { results, total };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default fetchImages;