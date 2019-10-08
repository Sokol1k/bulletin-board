import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Post = props => (
  <div className="post">
    <div className="post__header">
      <img src={require("../img/1.png")} alt=""></img>
      <div className="post__authorName">{props.post.authorName}</div>
    </div>
    <div className="post__content">
      <Link to={"/post=" + props.post._id} className="post__title">
        {props.post.title}
      </Link>
      <div className="post__text">
        {props.post.text.length > 255
          ? props.post.text.slice(0, 255).concat("...")
          : props.post.text}
      </div>
    </div>
    <div className="post__footer">
      <ul className="post__contacts">
        <li>Контакты:</li>
        <li>
          <a href="/">{props.post.email}</a>
        </li>
        <li>
          <a href="/">{props.post.phone}</a>
        </li>
      </ul>
    </div>
  </div>
);

export default class PostsAuthor extends Component {
  constructor(props) {
    super(props);
    this.onChangeCount = this.onChangeCount.bind(this);
    this.state = { posts: [], countPage: 10 };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/posts/")
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate() {
    axios
      .get("http://localhost:4000/posts/")
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  postList() {
    let count = 0;
    return this.state.posts.map((currentPost, i) => {
      if (
        count < this.state.countPage &&
        currentPost.authorName === this.props.match.params.name
      ) {
        count++;
        return <Post post={currentPost} key={i} />;
      } else {
        return null;
      }
    });
  }
  onChangeCount(e) {
    this.setState({
      countPage: e.target.value
    });
  }
  render() {
    return (
      <div className="container">
        <div className="create-btn-border">
          <Link to="/create" className="create-btn">
            <p>+</p>
          </Link>
        </div>
        <div className="post-counter">
          <div>Количество постов: </div>
          <input
            type="number"
            value={this.state.countPage}
            onChange={this.onChangeCount}
          />
        </div>
        {this.postList()}
      </div>
    );
  }
}
