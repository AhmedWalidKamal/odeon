import React, { Component } from "react";
import { Link } from "react-router-dom";

class MovieDiaryEntry extends Component {
  render() {
    const { title, poster_path, id, watchDate } = this.props.movie;

    const inlineStyle = {
      display: "inline-block"
    };

    return (
      <div>
        <div style={inlineStyle}>12 May</div>
        {/* TODO: replace with watched_date */}
        <Link to={`/movie/${id}`}>
          <img src={poster_path} alt="movie poster" />
        </Link>
        <Link to={`/movie/${id}`}>
          <div style={inlineStyle}>{title}</div>
        </Link>
      </div>
    );
  }
}

export default MovieDiaryEntry;
