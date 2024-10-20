import dataServices from '../data/movieData.js';
import movieUtils from './utils.js'

const getAll = () => dataServices.getMoviesData();

const create = async (req) => {
    const moviesData = await dataServices.getJsonData();

    //We get the form data - inputs and image file with formidable
    let [fields, file] = await movieUtils.getFormData(req)

    //We download the image to our img folder
    await dataServices.downloadImage(file);

    //We add the new movie to the collection
    movieUtils.updateCollection(fields, file.originalFilename, moviesData);

    //We save the new collection to the db
    await dataServices.parseToDatabase(moviesData)

}

const details = async (req) => {
    const movieId = req.params.movieId;

    const movies = await dataServices.getMoviesData();
    const currentMovie = movieUtils.findMovie(movies, movieId)
    
    return currentMovie;
}



export default {
    getAll,
    create,
    details
};