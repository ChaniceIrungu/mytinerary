import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchItineraries } from "../actions/itineraryActions";
import "../App.css";

import Activity from "./activity";

class Itinerary extends Component {
  componentDidMount() {
    var city = this.props.match.params.city;
    this.props.fetchItineraries(city);
    console.log(this.props);
    console.log(this.props.match.params.city);
    console.log(this.state);
  }

  constructor() {
    super();
    this.state = {
      selectedItinerary: ""
    };
  }

  handleToggle(e) {
    e.preventDefault();
    e.persist();
    console.log(e);
    console.log(e.target.id);
    this.setState({
      selectedItinerary: e.target.id
    });
  }

  render() {
    return (
      <div>
        <h1>City</h1>
        <h2>Available MYitenaries</h2>

        {this.props.itineraries.map(itinerary => (
          <div key={itinerary._id} className="itineraryContainer">
            <div className="itineraryFirstRow">
              {" "}
              <div className="profilePhoto">Profilephoto</div>
              <div className="itineraryInfo">
                <div className="itineraryTitle">{itinerary.title}</div>
                <div className="itineraryDetails">
                  <div className="itineraryLikes">
                    {"Likes :" + itinerary.likes}
                  </div>
                  <div className="itineraryDuration">
                    {itinerary.hours + " " + "Hours"}
                  </div>
                  <div className="itineraryExpense">{itinerary.expense}</div>
                </div>
              </div>
            </div>
            <div className="itinerarySecondRow">
              <div className="profileName">{itinerary.profileName}</div>
              <div className="itineraryHashtags">HASHTAGS</div>
            </div>
            <img
              className="sliderImage"
              src={itinerary.itineraryImage}
              alt="stuff"
            />
            <div>
              {this.state.selectedItinerary === itinerary._id ? (
                <Activity property={itinerary._id} />
              ) : null}
              <button id={itinerary._id} onClick={e => this.handleToggle(e)}>
                View All
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

Itinerary.propTypes = {
  fetchItineraries: PropTypes.func.isRequired,
  itineraries: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  itineraries: state.itineraries.item
});

export default connect(
  mapStateToProps,
  { fetchItineraries }
)(Itinerary);