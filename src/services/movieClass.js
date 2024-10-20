class CreateMovie {
    constructor(id, title, genre, director, year, imageUrl, rating, description) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.director = director;
        this.year = Number(year);
        this.imageUrl = imageUrl;
        this.rating = Number(rating);
        this.description = description;
    }
}

export default CreateMovie