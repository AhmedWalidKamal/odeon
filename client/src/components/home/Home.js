import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchMoviesCollection } from "../../actions/movieActions";
import "./home.scss";
import MoviePoster from "./MoviePoster";

class Home extends Component {
  componentDidMount() {
    const { collection } = this.props.match.params;
    if (collection) {
      this.props.fetchMoviesCollection(collection);
    } else {
      this.props.fetchMoviesCollection("popular");
    }
  }

  render() {
    let moviePosters = this.props.movieReducer.movies
      .slice(0, 15)
      .map((movie, i) => {
        return <MoviePoster key={i} movie={movie} />;
      });

    const { collection } = this.props.match.params;

    var subtitle = <div>Popular Today</div>;

    switch (collection) {
      case "popular":
        subtitle = <div>Popular Today</div>;
        break;
      case "top_rated":
        subtitle = <div>Top Rated</div>;
        break;
      case "upcoming":
        subtitle = <div>Upcoming</div>;
        break;
      case "now_playing":
        subtitle = <div>Now Playing</div>;
        break;
      default:
        break;
    }

    return (
      <div className="content">
        <div className="content__subtitle">{subtitle}</div>
        <div className="grid">{moviePosters}</div>
      </div>
    );
  }
}

Home.propTypes = {
  movieReducer: PropTypes.object.isRequired,
  fetchMoviesCollection: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  movieReducer: state.movieReducer
});

export default connect(
  mapStateToProps,
  { fetchMoviesCollection }
)(Home);
