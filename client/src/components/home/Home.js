import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchMoviesCollection } from "../../actions/movieActions";
import "./home.scss";
import HomeMovie from "./HomeMovie";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
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
    let moviesGrid = this.props.movieReducer.movies.map(movie => {
      return <HomeMovie key={movie.id} movie={movie} />;
    });

    return <div className="grid">{moviesGrid}</div>;
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
