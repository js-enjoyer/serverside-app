import formidable from 'formidable';
import path from 'path'
import fs from 'fs/promises'

import dataServices from '../data/movieData.js';
import CreateMovie from './movieClass.js';

const getAll = () => dataServices.getMoviesData();

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
    await addMovie(fields, file.originalFilename);
    
}

async function downloadImage(file) {
    let newPath = path.resolve(`./public/static/img/${file.originalFilename}`);
    
    await fs.copyFile(file.filepath, newPath);
}

async function addMovie(fields, fileName) {
    const moviesData = await dataServices.getJsonData();
    
    const newMovie = createMovie(fields, moviesData, fileName)
    moviesData.movies.push(newMovie);
    //We call a function that puts the new data into the database
    await dataServices.parseToDatabase(moviesData)
}

function createMovie({title, genre, director, year, rating, description}, moviesData, fileName) {
    const id = moviesData.movies.length + 1;
    const imageUrl = `./static/img/${fileName}`;

    const newMovie = new CreateMovie(id, title, genre, director, year, imageUrl, rating, description);

    return newMovie;
}

export default {
    getAll,
    parseFormData
};