import fs from 'fs/promises';
import path from 'path';

const dbPath = path.resolve('./src/db.json')

async function getJsonData() {
    const data = await fs.readFile(dbPath);
    const db = JSON.parse(data);

    return db;
}

async function getMoviesData() {
    const jsonData = await getJsonData();

    return jsonData.movies;
}

async function parseToDatabase(moviesData) {
    //Stringifying the data and specifying we want 2 spaces after ineach put with the third argument
    const jsonMoviesData = JSON.stringify(moviesData, null, 2);

    await fs.writeFile(dbPath, jsonMoviesData, { encoding: 'utf-8' });
}

async function downloadImage(file) {
    let newPath = path.resolve(`./public/static/img/${file.originalFilename}`);
    
    await fs.copyFile(file.filepath, newPath);
}


export default {
    getMoviesData,
    getJsonData,
    parseToDatabase,
    downloadImage
}