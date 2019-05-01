import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./posterGrid.scss";

const isEmpty = require("is-empty");

class PosterGrid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { movies } = this.props.movies;
    console.log(movies);

    return (
      <div className="fluid-container">
        {!isEmpty(movies) ? (
          <div className="sites">{this.renderMovies(movies)}</div>
        ) : (
          <div className="sites">
            <a href="#"><img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/2kSElneXSKmMsGL55k0CbPGqLbu.jpg" /><span id="title">The Turin Horse</span></a>
            <a href="#"><img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/nxWEG9JzmJx3eLE8y7CUHmaj3CE.jpg" /><span id="title">Werckmeister Harmonies</span></a>
            <a href="#"><img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/c6Hls0S258kj5aIjGDQlqsa1ArR.jpg" /><span id="title">Satantango</span></a>
            <a href="#"><img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/aPH4lMgw0ADL7mJWxc5HZaxcbjg.jpg" /><span id="title">Damnation</span></a>
            <a href="#"><img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/poBhgpN4fJfzaRuG4wMLah3rHLw.jpg" /><span id="title">The Man From London</span></a>
            <a href="#"><img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/279Fgrg9yqtaCNxrVTm7y4NY0k7.jpg" /><span id="title">Family Nest</span></a>
            <a href="#"><img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/acGFjExUH4uxTtIhV1HBAejasTz.jpg" /><span id="title">The Prefab People</span></a>
            <a href="#"><img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/w1zFwAX87FwLvx9JEHnhFCf5kZj.jpg" /><span id="title">Autumn Almanac</span></a>
          </div>
        )}
      </div>
    );
  }

  renderMovies = movies => {
    var posters = movies.map((movie) => {
      return <Link to={`/movie/${movie.id}`}>
              <img src={`${movie.poster_path}`}/>
              <span id="title">{movie.title}</span>
            </Link>;
    });
    return posters;
  };
}

export default (PosterGrid);
