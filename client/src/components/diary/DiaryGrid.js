import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MovieDiaryEntry from "./MovieDiaryEntry";
import { fetchShelfMovies } from "../../actions/movieActions";

import "./diary.scss";

const isEmpty = require("is-empty");

class DiaryGrid extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchShelfMovies(this.props.userReducer.user.shelves["Watched"]);
  }

  render() {
    const { user } = this.props.userReducer;
    const { shelves } = this.props.movieReducer;

    let movieDiaries = null;
    if (!isEmpty(shelves)) {
      movieDiaries = shelves[user.shelves["Watched"]].map((movie, i) => {
        console.log(movie);
        return <MovieDiaryEntry key={i} movie={movie} />;
      });
    }

    return (
      <div className="content">
        <div className="content__subtitle">Diary</div>
        {movieDiaries !== null ? (
          <div className="diary">{movieDiaries}</div>
        ) : (
          <div className="diary" />
        )}
      </div>
    );
  }
}

DiaryGrid.propTypes = {
  movieReducer: PropTypes.object.isRequired,
  userReducer: PropTypes.object.isRequired,
  fetchShelfMovies: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  movieReducer: state.movieReducer,
  userReducer: state.userReducer
});

export default connect(
  mapStateToProps,
  { fetchShelfMovies }
)(DiaryGrid);
