import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchMoviesCollection } from "../../actions/movieActions";
import "./home.scss";
import MoviePoster from "./MoviePoster";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { collection } = this.props.match.params;
    console.log(this.props.match.params);

    if (collection) {
      this.props.fetchMoviesCollection(collection);
    } else {
      this.props.fetchMoviesCollection("popular");
    }



  }

  render() {
    console.log(this.props);
    let moviePosters = this.props.movieReducer.movies.slice(1, 15).map(movie => {
      return <MoviePoster key={movie.id} movie={movie} />;
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
