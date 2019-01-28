import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";
import { createAccount } from "../actions/accountActions";
import { fetchCountries } from "../actions/countryActions";
import PropTypes from "prop-types";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => val.length > 0 && (valid = false));

  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "grey",
      userName: null,
      password: null,
      email: null,
      firstName: null,
      lastName: null,
      country: null,
      formErrors: {
        userName: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        country: "",
        formError: ""
      }
    };
  }

  componentDidMount() {
    this.props.fetchCountries();
    console.log(this.props.countries);
    console.log(this.props);
  }

  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      console.log(`Submitting
      Username: ${this.state.userName}
      Password: ${this.state.password}
      Email: ${this.state.email}
      First Name: ${this.state.firstName}
      Last Name: ${this.state.lastName}
      Country: ${this.state.country}`);
    } else {
      console.error("FORM INVALID");
    }

    if (formValid(this.state)) {
      const userName = this.state.userName;
      const password = this.state.password;
      const email = this.state.email;
      const firstName = this.state.firstName;
      const lastName = this.state.lastName;
      const country = this.state.country;
      this.props.createAccount(
        userName,
        password,
        email,
        firstName,
        lastName,
        country
      );
    }
    // console.log(this.props.message);
  };

  handleSubmitButtonChange = e => {
    console.log("we are here");
    e.preventDefault();
    if (formValid(this.state)) {
      this.setState({ color: "green" });
    } else {
      console.log("form not valid yet to submit");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "userName":
        formErrors.userName =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 3 characters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characters required" : "";
        break;
      case "country":
        formErrors.country = value.length < 0 ? "please choose a country" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));

    // formValid(this.state)
    //   ? this.setState({ color: "green" })
    //   : this.setState({ color: "grey" });
  };

  fileSelectedHandler = event => {
    console.log(event.target.files[0]);
  };

  // profileSubmit = e => {
  //   axios.post("/upload", upload.single("file"), (req, res) => {
  //     res.json({ file: req.file });
  //   });
  // }

  render() {
    const { formErrors } = this.state;

    return (
      <div>
        <h1> Create Account</h1>

        {/* <form
          onSubmit={this.profileSubmit}
          action="/upload"
          method="POST"
          encType="multipart/form-data"
        >
          <div>
            <input type="file" name="file" id="file" />
          </div>
          <label htmlFor="file">Choose File</label>
          <input type="submit" value="submit" />
        </form> */}

        <form
          onChange={this.handleSubmitButtonChange}
          onSubmit={this.handleSubmit}
        >
          <div>
            <label>Profile Photo:</label>
            <input type="file" onChange={this.fileSelectedHandler} />
          </div>

          <div className="userName">
            <label htmlFor="userName">Username: </label>
            <input
              type="text"
              placeholder="Username"
              name="userName"
              onChange={this.handleChange}
              className={formErrors.userName.length > 0 ? "error" : null}
            />
            {formErrors.userName.length > 0 && (
              <span>{formErrors.userName}</span>
            )}
          </div>
          <div className="password">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              className={formErrors.password.length > 0 ? "error" : null}
            />
            {formErrors.password.length > 0 && (
              <span>{formErrors.password}</span>
            )}
          </div>
          <div className="email">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
              className={formErrors.email.length > 0 ? "error" : null}
            />
            {formErrors.email.length > 0 && <span>{formErrors.email}</span>}
          </div>
          <div className="firstName">
            <label htmlFor="firstName">First Name: </label>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={this.handleChange}
              className={formErrors.firstName.length > 0 ? "error" : null}
            />
            {formErrors.firstName.length > 0 && (
              <span>{formErrors.firstName}</span>
            )}
          </div>
          <div className="lastName">
            <label htmlFor="lastName">Last Name: </label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={this.handleChange}
              className={formErrors.lastName.length > 0 ? "error" : null}
            />
            {formErrors.lastName.length > 0 && (
              <span>{formErrors.lastName}</span>
            )}
          </div>
          <div className="country">
            <label htmlFor="country">Country: </label>
            <select
              className=""
              name="country"
              onChange={this.handleChange}
              required
            >
              <option value="" disabled selected>
                Choose your Country{" "}
              </option>
              {this.props.countries.map(country => (
                <option key={country._id} value={country.country}>
                  {country.country}
                </option>
              ))}
            </select>
            {formErrors.country.length > 0 && <span>{formErrors.country}</span>}
          </div>
          <div>
            <input required type="checkbox" />
            <label>I agree to MYtinerary's Terms &amp; Conditions</label>
          </div>
          <div>
            <button style={{ background: this.state.color }} type="submit">
              OK
            </button>
          </div>
        </form>
      </div>
    );
  }
}

SignupPage.propTypes = {
  fetchCountries: PropTypes.func.isRequired,
  createAccount: PropTypes.func.isRequired
  //accounts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  countries: state.countries.country,
  accounts: state.accounts.account,
  message: state.message.message
});

export default connect(
  mapStateToProps,
  { createAccount, fetchCountries }
)(SignupPage);