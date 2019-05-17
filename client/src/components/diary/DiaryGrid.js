import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MovieDiaryEntry from "./MovieDiaryEntry";

import "./diary.scss";

class DiaryGrid extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { user } = this.props.userReducer;
    const { shelves } = this.props.movieReducer;

    console.log(this.props.movieReducer);
    console.log(user);

    let movieDiaries = shelves[user.shelves["Watched"]].map(movie => {
      console.log(movie);
      return <MovieDiaryEntry key={movie.id} movie={movie} />;
    });

    return (
      <div className="content">
        <div className="content__subtitle">Diary</div>
        <div className="diary">{movieDiaries}</div>
      </div>
    );
  }
}

DiaryGrid.propTypes = {
  movieReducer: PropTypes.object.isRequired,
  userReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  movieReducer: state.movieReducer,
  userReducer: state.userReducer
});

export default connect(
  mapStateToProps,
  {}
)(DiaryGrid);
