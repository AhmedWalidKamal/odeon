import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./diary.scss";

class MovieDiaryEntry extends Component {
  render() {
    const { title, poster_path, id, watchDate } = this.props.movie;

    const inlineStyle = {
      display: "inline-block"
    };

    return (
      <div className='diary'>
        <div className="inline">{new Date(watchDate).toDateString()}</div>
        <Link to={`/movie/${id}`}>
          <img src={poster_path} alt="movie poster" />
        </Link>
        <Link to={`/movie/${id}`}>
          <div class="inline title">{title}</div>
        </Link>
      </div>
    );
  }
}

export default MovieDiaryEntry;
