import formidable from 'formidable';
import uniqid from 'uniqid'

import CreateMovie from "./movieClass.js";

function updateCollection(fields, fileName, moviesData) {
    const newId = uniqid()
    const imageUrl = `./static/img/${fileName}`;

    const newMovie = createMovie(fields, imageUrl, newId)

    moviesData.movies.push(newMovie);
}

function createMovie({title, genre, director, year, rating, description}, imageUrl, id) {
    const newMovie = new CreateMovie(id, title, genre, director, year, imageUrl, rating, description);

    return newMovie;
}

async function getFormData(req) {
    const form = formidable();

    let [fields, files] = await form.parse(req);
    let [file] = files.image;
    
    //We transform the values in the fields object to string because they are currently arrays with strings 
    for (const key in fields) {
        let [ value ] = fields[key];

        fields[key] = value;
    }

    return [fields, file]
}

function findMovie(movies, movieId) {
    const currentMovie = movies.find(movie => movie.id === movieId)

    currentMovie.viewRating = showStars(currentMovie)

    return currentMovie
}

function showStars(currentMovie) {
    if(!Number.isInteger(currentMovie.rating)) {
        return 'n\\a'
    }
    return '&#x2605;'.repeat(n)
}

export default {
    updateCollection,
    getFormData,
    findMovie
}