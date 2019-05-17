import React, { Component } from "react";
import { Link } from "react-router-dom";

class MovieDiaryEntry extends Component {
  render() {
    const { title, poster_path, id, watched_date } = this.props.movie;
    return (
      <div>
        <div style="display: inline-block;">12 May</div>
        {/* TODO: replace with watched_date */}
        <Link to={`/movie/${id}`}>
          <img src={poster_path} alt="movie poster"/>
        </Link>
        <Link to={`/movie/${movie.id}`}>
          <div style="display: inline-block;">{movie.title}</div>
        </Link>
      </div>
    );
  }
}

export default MovieDiaryEntry;
