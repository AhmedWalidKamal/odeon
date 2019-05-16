import React, { Component } from "react";
import { Link } from "react-router-dom";

class MoviePoster extends Component {
  render() {
    const { title, poster_path, id } = this.props.movie;
    return (
      <Link to={`/movie/${id}`}>
        <img src={poster_path} alt="movie poster"/>
        <span id="title">{title}</span>
      </Link>
    );
  }
}

export default MoviePoster;
