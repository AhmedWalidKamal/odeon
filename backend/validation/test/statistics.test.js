const isEmpty = require("is-empty");
const moviesUtil = require("../../moviesUtil");

const formatMovie = function(moviesGenres) {
  // genres: [
  //   {
  //     id: {
  //       type: Number,
  //       required: true
  //     },
  //     name: {
  //       type: String,
  //       required: true
  //     }
  //   }
  // ];
  return moviesGenres.map(genres => {
    return {
      genres: genres.map(genre => {
        return { name: genre };
      })
    };
  });
};

const formatRatings = function(ratings) {
  // ratings: [
  //   {
  //     movieId: {
  //       type: Number
  //     },
  //     rating: {
  //       type: Number
  //     }
  //   }
  // ];
  return ratings.map(rating => {
    return { rating };
  });
};

const formatShelf = function(watchDates) {
  // const ShelfSchema = new Schema({
  //   name: {
  //     type: String,
  //     required: true
  //   },
  //   movies: [
  //     {
  //       movieId: {
  //         type: Number
  //       },
  //       watchDate: {
  //         type: Date,
  //         default: Date.now
  //       }
  //     }
  //   ]
  // });
  const shelf = {};
  shelf.movies = watchDates.map(watchDate => {
    return { watchDate };
  });

  return shelf;
};

describe("Statistics validation", () => {
  // Create tests
  it("Test movies count per genre with valid data for a single movie", () => {
    console.log(
      JSON.stringify(
        formatMovie([["Comedy", "Action", "Drama", "Thriller", "Horror"]])
      )
    );
    expect(
      moviesUtil.countMoviesPerGenre(
        formatMovie([["Comedy", "Action", "Drama", "Thriller", "Horror"]])
      )
    ).toEqual({ Comedy: 1, Thriller: 1, Drama: 1, Horror: 1, Action: 1 });
  });
  it("Test movies count per genre with valid data for multiple movies", () => {
    expect(
      moviesUtil.countMoviesPerGenre(
        formatMovie([
          ["Thriller", "Drama", "Action", "Horror"],
          ["Comedy", "Action", "Drama", "Thriller", "Horror"]
        ])
      )
    ).toEqual({ Comedy: 1, Thriller: 2, Drama: 2, Horror: 2, Action: 2 });
  });
  it("Test movies count per genre with valid data for multiple movies with duplicate genres", () => {
    expect(
      moviesUtil.countMoviesPerGenre(
        formatMovie([
          [
            "Comedy",
            "Thriller",
            "Drama",
            "Action",
            "Comedy",
            "Comedy",
            "Comedy",
            "Comedy",
            "Drama",
            "Drama",
            "Thriller",
            "Horror"
          ],
          ["Comedy", "Action", "Drama", "Thriller", "Horror"]
        ])
      )
    ).toEqual({ Comedy: 6, Thriller: 3, Drama: 4, Horror: 2, Action: 2 });
  });
  it("Test movies count per genre with no genres for a single movie", () => {
    expect(moviesUtil.countMoviesPerGenre(formatMovie([[]]))).toEqual({});
  });
  it("Test movies count per genre with no genres for multiple movies", () => {
    expect(moviesUtil.countMoviesPerGenre(formatMovie([[], []]))).toEqual({});
  });
  it("Test movies count per genre with no genres a movie in multiple movies", () => {
    expect(
      moviesUtil.countMoviesPerGenre(formatMovie([[], ["Drama", "Comedy"]]))
    ).toEqual({ Drama: 1, Comedy: 1 });
  });
  it("Test movies count per genre with null movies", () => {
    expect(moviesUtil.countMoviesPerGenre(null)).toEqual({});
  });
  it("Test movies count per genre with empty movies", () => {
    expect(moviesUtil.countMoviesPerGenre([])).toEqual({});
  });
  it("Test movies count per genre with a single movie with null genres", () => {
    expect(() => moviesUtil.countMoviesPerGenre([{ genres: null }])).toThrow();
  });
  it("Test movies count per genre with a single movie with missing genres", () => {
    expect(() => moviesUtil.countMoviesPerGenre([{}])).toThrow();
  });
  it("Test movies count per genre with a single movie with null genre", () => {
    expect(() =>
      moviesUtil.countMoviesPerGenre([{ genres: [null] }])
    ).toThrow();
  });
  it("Test movies count per rating with valid data for a single movie", () => {
    console.log(JSON.stringify(formatRatings([3.5])));
    expect(moviesUtil.countMoviesPerRating(formatRatings([3.5]))).toEqual({
      "3.5": 1
    });
  });
  it("Test movies count per rating with valid data for multiple movies", () => {
    expect(moviesUtil.countMoviesPerRating(formatRatings([3.5, 4, 5]))).toEqual(
      { "3.5": 1, "4": 1, "5": 1 }
    );
  });
  it("Test movies count per rating with valid data for multiple movies with duplicate ratings", () => {
    expect(
      moviesUtil.countMoviesPerRating(formatRatings([3.5, 4, 5, 4, 4, 3.5, 1]))
    ).toEqual({ "3.5": 2, "4": 3, "5": 1, "1": 1 });
  });
  it("Test movies count per rating with no ratings", () => {
    expect(moviesUtil.countMoviesPerRating(formatRatings([]))).toEqual({});
  });
  it("Test movies count per rating with null movies", () => {
    expect(moviesUtil.countMoviesPerRating(null)).toEqual({});
  });
  it("Test movies count per rating with a single movie with null rating", () => {
    expect(() =>
      moviesUtil.countMoviesRating(formatRatings([null, 1]))
    ).toThrow();
  });
  it("Test movies count per month with valid data for a single movie", () => {
    console.log(JSON.stringify(formatShelf([new Date()])));
    expect(moviesUtil.countMoviesPerMonth(formatShelf([new Date()]))).toEqual({
      "May 2019": 1
    });
  });
  it("Test movies count per month with valid data for multiple movies", () => {
    expect(
      moviesUtil.countMoviesPerMonth(
        formatShelf([new Date(), new Date("March 21, 2019")])
      )
    ).toEqual({
      "May 2019": 1,
      "March 2019": 1
    });
  });
  it("Test movies count per month with valid data for multiple movies with duplicate dates", () => {
    expect(
      moviesUtil.countMoviesPerMonth(
        formatShelf([new Date(), new Date("March 21, 2019"), new Date()])
      )
    ).toEqual({
      "May 2019": 2,
      "March 2019": 1
    });
  });
  it("Test movies count per month with no movies", () => {
    expect(moviesUtil.countMoviesPerMonth(formatShelf([]))).toEqual({});
  });
  it("Test movies count per month with null shelf", () => {
    expect(() => moviesUtil.countMoviesPerMonth(null)).toThrow();
  });
  it("Test movies count per month with null movies", () => {
    expect(moviesUtil.countMoviesPerMonth({ movies: null })).toEqual({});
  });
  it("Test movies count per month with with null date", () => {
    expect(() =>
      moviesUtil.countMoviesPerMonth(formatShelf([new Date(), null]))
    ).toThrow();
  });
  it("Test movies count per month with valid data with dates out of range", () => {
    expect(
      moviesUtil.countMoviesPerMonth(
        formatShelf([new Date(), new Date("March 21, 2021"), new Date()])
      )
    ).toEqual({
      "May 2019": 2
    });
  });
  it("Test movies count per month with valid data with dates out of range 2", () => {
    expect(
      moviesUtil.countMoviesPerMonth(
        formatShelf([new Date(), new Date("March 21, 2015"), new Date()])
      )
    ).toEqual({
      "May 2019": 2
    });
  });
});
