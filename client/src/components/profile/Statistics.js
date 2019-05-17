import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchStatistics } from "../../actions/userActions";
import C3Chart from "react-c3js";
import "c3/c3.css";
import "./profileCard.scss";

const isEmpty = require("is-empty");

const c3_color_pattern = [
  "#cd5c5c",
  "#ba5353",
  "#a74b4b",
  "#954242",
  "#823a3a",
  "#6f3232",
  "#5d2929"
];
const genres_piechart = {
  data: {
    columns: [],
    type: "pie"
  },
  color: {
    pattern: c3_color_pattern
  },
  legend: {
    position: "right"
  },
  pie: {
    label: {
      threshold: 0.1
    }
  }
};

const barchart = {
  color: {
    pattern: c3_color_pattern
  },
  axis: {
    y: {
      show: false
    },
    x: {
      show: false
    }
  }
};

const watched_this_year_barchart = {
  data: {
    columns: [],
    type: "bar"
  }
};

const average_ratings_barchart = {
  data: {
    columns: [],
    type: "bar"
  },
  size: {
    width: 480
  }
};

class Statistics extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id } = this.props.userReducer.user;
    this.props.fetchStatistics(id);
  }

  render() {
    const { statistics } = this.props.userReducer;
    if (!isEmpty(statistics)) {
      const {
        countMoviesPerGenre,
        countMoviesPerMonth,
        countMoviesPerRating
      } = statistics;

      genres_piechart.data.columns = Object.entries(countMoviesPerGenre);
      average_ratings_barchart.data.columns = Object.entries(
        countMoviesPerRating
      ).map(entry => {
        entry[0] = parseFloat(entry[0]).toFixed(1)
        return entry;
      });
      average_ratings_barchart.data.columns.sort(function(a, b) {
        return a[0] - b[0];
      });
      watched_this_year_barchart.data.columns = Object.entries(
        countMoviesPerMonth
      );
    }
    return (
      <div>
        <div className="content__subtitle">Statistics</div>

        <div className="inline">
          <C3Chart
            className="inline"
            data={genres_piechart.data}
            color={genres_piechart.color}
            legend={genres_piechart.legend}
            pie={genres_piechart.pie}
          />
          <C3Chart
            className="inline"
            data={watched_this_year_barchart.data}
            color={barchart.color}
            axis={barchart.axis}
            size={average_ratings_barchart.size}
          />
          <C3Chart
            className="inline"
            data={average_ratings_barchart.data}
            color={barchart.color}
            axis={barchart.axis}
            size={average_ratings_barchart.size}
          />
        </div>
      </div>
    );
  }
}

Statistics.propTypes = {
  userReducer: PropTypes.object.isRequired,
  fetchStatistics: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userReducer: state.userReducer
});

export default connect(
  mapStateToProps,
  { fetchStatistics }
)(Statistics);
