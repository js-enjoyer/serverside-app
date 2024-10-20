import formidable from 'formidable';

import CreateMovie from "./movieClass.js";

function updateCollection(fields, fileName, moviesData) {
    const newId = moviesData.movies.length + 1;
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

export default {
    updateCollection,
    getFormData
}