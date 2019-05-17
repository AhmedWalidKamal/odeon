import React, { Component } from "react";
import { Link } from "react-router-dom";

class MovieDiaryEntry extends Component {
  render() {
    const { title, poster_path, id, watched_date } = this.props.movie;
    return <div />;
  }
}

export default MovieDiaryEntry;
