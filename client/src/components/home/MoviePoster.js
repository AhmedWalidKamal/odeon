import React, { Component } from "react";
import { Link } from "react-router-dom";

class MoviePoster extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { title, poster_path, id } = this.props.movie;
    return (
      <Link to={`/movie/${id}`}>
        <img src={poster_path} />
        <span id="title">{title}</span>
      </Link>
    );
  }
}

export default MoviePoster;
