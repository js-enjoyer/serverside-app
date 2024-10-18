import fs from 'fs/promises';
import path from 'path';

async function getData() {
    const dbPath = path.resolve('./src/db.json')
    const data = await fs.readFile(dbPath);
    const db = JSON.parse(data);

    return db.movies;
}

async function getMovies() {
    const movies = await getData();

    return movies;
}

export default {
    getMovies,
}