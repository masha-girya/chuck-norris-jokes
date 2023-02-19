import { Joke } from '../types/Joke';

const API_URL = 'https://api.chucknorris.io/jokes';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export function getCategories(): Promise<string[]> {
  const fullURL = API_URL + '/categories';

  return wait(1000)
    .then(() => fetch(fullURL))
    .then(response => response.json())
    .then(response => response.sort((
      res1: string,
      res2: string
    ) => res1.localeCompare(res2)));
}

export function getRandomJokeByCategory(category: string): Promise<Joke> {
  const fullURL = API_URL + '/random?category=' + category;

  return wait(1000)
    .then(() => fetch(fullURL))
    .then(response => response.json());
}


export function getRandomJoke(): Promise<Joke> {
  return wait(1000)
    .then(() => fetch(`${API_URL}/random`))
    .then(response => response.json());
}
