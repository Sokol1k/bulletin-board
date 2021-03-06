import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/PostVeiw.css";

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
            <img src={require('../img/1.png')} alt=""></img>
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 395 395" className="mail">
            <polygon points="395,320.089 395,74.911 258.806,197.5 	" />
            <polygon points="197.5,252.682 158.616,217.682 22.421,340.271 372.579,340.271 236.384,217.682 	" />
            <polygon points="372.579,54.729 22.421,54.729 197.5,212.318 	" />
            <polygon points="0,74.911 0,320.089 136.194,197.5 	" />
          </svg>

          <a href="/">{this.state.email}</a>
        </li>
        <li>
          <svg
            className="phone"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 348.077 348.077"
          >
            <path
              d="M340.273,275.083l-53.755-53.761c-10.707-10.664-28.438-10.34-39.518,0.744l-27.082,27.076
				c-1.711-0.943-3.482-1.928-5.344-2.973c-17.102-9.476-40.509-22.464-65.14-47.113c-24.704-24.701-37.704-48.144-47.209-65.257
				c-1.003-1.813-1.964-3.561-2.913-5.221l18.176-18.149l8.936-8.947c11.097-11.1,11.403-28.826,0.721-39.521L73.39,8.194
				C62.708-2.486,44.969-2.162,33.872,8.938l-15.15,15.237l0.414,0.411c-5.08,6.482-9.325,13.958-12.484,22.02
				C3.74,54.28,1.927,61.603,1.098,68.941C-6,127.785,20.89,181.564,93.866,254.541c100.875,100.868,182.167,93.248,185.674,92.876
				c7.638-0.913,14.958-2.738,22.397-5.627c7.992-3.122,15.463-7.361,21.941-12.43l0.331,0.294l15.348-15.029
				C350.631,303.527,350.95,285.795,340.273,275.083z"
            />
          </svg>
          <a href={"tel:" + this.state.phone + ""}>{this.state.phone}</a>
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
