import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchStatistics } from "../../actions/userActions";
import C3Chart from "react-c3js";
import "c3/c3.css";

import "./profileCard.scss";

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
    columns: [
      ["data1", 30],
      ["data2", 40],
      ["data3", 50],
      ["data4", 20],
      ["data5", 10],
      ["data6", 8]
    ],
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
    columns: [
      // TODO: replace with months in current year
      ["Jan 2019", 5],
      ["Feb 2019", 6],
      ["Mar 2019", 9],
      ["Apr 2019", 6],
      ["May 2019", 4],
      ["Jun 2019", 12],
      ["Jul 2019", 10],
      ["Aug 2019", 8],
      ["Sep 2019", 20],
      ["Oct 2019", 18],
      ["Nov 2019", 15],
      ["Dec 2019", 8]
    ],
    type: "bar"
  }
};

const average_ratings_barchart = {
  data: {
    columns: [
      ["0.5", 5],
      ["1.0", 10],
      ["1.5", 15],
      ["2.0", 20],
      ["3.0", 25],
      ["3.5", 35],
      ["4.0", 30],
      ["4.5", 25],
      ["5.0", 15]
    ],
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
    console.log(statistics);

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
