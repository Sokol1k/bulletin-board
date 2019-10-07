import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./PostVeiw.css";

export default class PostVeiw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      authorName: "",
      email: "",
      phone: "",
      check: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/posts/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          title: response.data.title,
          text: response.data.text,
          authorName: response.data.authorName,
          email: response.data.email,
          phone: response.data.phone,
          check: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return ( this.state.check !== '' ? 
      <div className="container">
        <div className="post">
          <div className="post__header">
            <img src="" alt=""></img>
            <div className="post__authorName">{this.state.authorName}</div>
          </div>
          <div className="post__content">
            <div className="post__title">{this.state.title}</div>
            <div className="post__text">{this.state.text}</div>
          </div>
          <div className="post__footer">
            <ul className="post__contacts">
              <li>Контакты:</li>
              <li>
                <a href="/">{this.state.email}</a>
              </li>
              <li>
                <a href="/">{this.state.phone}</a>
              </li>
            </ul>
            <div className="post__tools">
              <Link
                to={`/remove/${this.props.match.params.id}`}
                className="remove"
              >
                Remove
              </Link>
              <Link
                to={`/update/${this.props.match.params.id}`}
                className="update"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div> : null
    );
  }
}
