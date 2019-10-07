import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./RemovePost.css"

export default class RemovePost extends Component {
  constructor(porps) {
    super();
    this.state = {
      res: undefined
    };
  }
  componentDidMount() {
    axios
      .delete("http://localhost:4000/posts/remove/" + this.props.match.params.id)
      .then(() => (this.setState({ res: true })))
      .catch(() => (this.setState({ res: false })));
      console.log(this.state.res);
  }
  render() {
    return (
      <div className="container">
        <div className="remove-post">
          {this.state.res ? (
            <div>
              <div className="remove-post__text">Пост удален!</div>
              <Link to="/" className="remove-btn">Вернуться на главную</Link>
            </div>
          ) : (
            <div className="remove-post__text">Ошибка!</div>
          )}
        </div>
      </div>
    );
  }
}
