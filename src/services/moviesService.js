import formidable from 'formidable';
import path from 'path'
import fs from 'fs/promises'

import movieData from '../data/movieData.js';
import CreateMovie from './movieClass.js';

const getAll = () => movieData.getMovies();

const parseFormData = async function(req) {
    const form = formidable();

    let [fields, files] = await form.parse(req);
    let [file] = files.image;
    
    //We transform the values in the fields object to string because they are currently arrays with strings 
    for (const key in fields) {
        let [ value ] = fields[key];

        fields[key] = value;
    }
    //We download the image to our img folder
    await downloadImage(file);
    //We parse the whole data from the form to the database
    await parseToDataBase(fields, file);
    
}

async function downloadImage(file) {
    let newPath = path.resolve(`./public/static/img/${file.originalFilename}`);
    
    await fs.copyFile(file.filepath, newPath);
}

async function parseToDataBase(fields, file) {
    const jsonPath = path.resolve('./src/db.json');

    const moviesData = await getJsonData(jsonPath);
    console.log(fields);
    addMovie(fields, moviesData, file)
    //Stringifying the data and specifying we want 2 spaces after each input with the third argument
    const jsonMoviesData = JSON.stringify(moviesData, null, 2);

    await fs.writeFile(jsonPath, jsonMoviesData, { encoding: 'utf-8' });
}

async function getJsonData(path) {
    let jsonData = await fs.readFile(path, { encoding: 'utf-8'});
    let data = JSON.parse(jsonData);

    return data
}

function addMovie({title, genre, director, year, rating, description}, moviesData, file) {
    const id = moviesData.movies.length + 1;
    const imageUrl = `./static/img/${file.originalFilename}`;

    const newMovie = new CreateMovie(id, title, genre, director, year, imageUrl, rating, description)

    moviesData.movies.push(newMovie);
}

export default {
    getAll,
    parseFormData
};