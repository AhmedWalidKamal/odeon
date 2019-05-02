import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Rating from "react-rating";
import { fetchMovie, rateMovie } from "../../actions/movieActions";
import "./movieCard.scss";

const isEmpty = require("is-empty");

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.rateMovie = this.rateMovie.bind(this);
  }

  rateMovie(rating) {
    console.log(rating);
    this.props.rateMovie(this.props.movieReducer.movie.id, rating);
  }

  componentDidMount() {
    this.props.fetchMovie(this.props.match.params.id);
  }

  render() {
    const { movie } = this.props.movieReducer;
    var ratings = this.props.userReducer.user.ratings;

    if (ratings == null) {
      ratings = [];
    }

    let initRating = 0;
    ratings.forEach(rating => {
      if (rating.movieId === movie.id) {
        initRating = rating.rating;
      }
    });
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.0.10/css/all.css"
        />
        <div className="wrapper">
          <div className="film-card js-film-card">
            <div className="film-card__img">
              {!isEmpty(movie) && !isEmpty(movie.poster_path) ? (
                <img src={movie.poster_path} alt="film card" />
              ) : (
                <img src="/img/default-poster.jpg" alt="film card" />
              )}
            </div>
            <div className="film-card__cnt js-film-cnt">
              {!isEmpty(movie) && !isEmpty(movie.title) ? (
                <div className="film-card__name">{movie.title}</div>
              ) : (
                <div className="file-card__name">Movie Title</div>
              )}
              <div className="film-card__tags list--inline">
                {!isEmpty(movie) &&
                !isEmpty(movie.ratings_count) &&
                movie.ratings_count != 0 ? (
                  <li>{movie.avg_rating}</li>
                ) : (
                  <li>Unrated</li>
                )}

                {!isEmpty(movie) && !isEmpty(movie.release_date) ? (
                  <li>{new Date(movie.release_date).getFullYear()}</li>
                ) : (
                  <li>Release Date</li>
                )}

                {!isEmpty(movie) && !isEmpty(movie.genres) ? (
                  <li>{this.getGenres(movie.genres)}</li>
                ) : (
                  <li>Genre</li>
                )}

                {!isEmpty(movie) && !isEmpty(movie.language) ? (
                  <li>{movie.language.toUpperCase()}</li>
                ) : (
                  <li>Language</li>
                )}

                {!isEmpty(movie) && !isEmpty(movie.duration) ? (
                  <li>{movie.duration} min</li>
                ) : (
                  <li>Duration</li>
                )}
              </div>

              <div className="icon-bar">
                <a href="#">
                  <i className="fas fa-eye checked" />
                </a>
                <a href="#">
                  <i className="fas fa-heart" />
                </a>
                <a href="#">
                  <i className="fas fa-history" />
                </a>
              </div>

              <div className="film-card__subtitle">Overview</div>
              {!isEmpty(movie) && !isEmpty(movie.plot_summary) ? (
                <div className="film-card__txt">{movie.plot_summary}</div>
              ) : (
                <div className="film-card__txt">Plot Summary</div>
              )}
              <div className="film-card__tags2">
                <div className="list--inline">
                  <li>
                    <div className="film-card__tagtitle">Director(s)</div>
                  </li>
                  {!isEmpty(movie) && !isEmpty(movie.directors) ? (
                    this.renderNames(movie.directors)
                  ) : (
                    <li>Director</li>
                  )}
                </div>
                <div className="list--inline">
                  <li>
                    <div className="film-card__tagtitle">Cast</div>
                  </li>
                  {!isEmpty(movie) && !isEmpty(movie.cast) ? (
                    this.renderNames(movie.cast)
                  ) : (
                    <li>Cast</li>
                  )}
                </div>
              </div>

              <div className="icon-bar">
                <Rating
                  className="Rating"
                  emptySymbol="far fa-star Rating__empty"
                  fullSymbol="fas fa-star Rating__full"
                  fractions={2}
                  initialRating={initRating}
                  onClick={rating => this.rateMovie(rating)}
                />
              </div>
            </div>
          </div>
          <div className="film-card__overlay js-message-close" />
        </div>
      </div>
    );
  }

  getGenres = genres => {
    var genreNames = genres.map(({ name }) => name);
    return genreNames.join(", ");
  };

  renderNames = (persons, size = 4) => {
    var names = persons.map(person => {
      return <li key={person.id}>{person.name}</li>;
    });
    if (names.length > size) {
      return names.slice(0, size);
    } else {
      return names;
    }
  };
}

MovieCard.propTypes = {
  movieReducer: PropTypes.object.isRequired,
  userReducer: PropTypes.object.isRequired,
  fetchMovie: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  movieReducer: state.movieReducer,
  userReducer: state.userReducer
});

export default connect(
  mapStateToProps,
  { fetchMovie, rateMovie }
)(MovieCard);
