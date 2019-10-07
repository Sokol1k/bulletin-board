import React, { Component } from "react";
import axios from "axios";

export default class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.onChangePostTitle = this.onChangePostTitle.bind(this);
    this.onChangePostText = this.onChangePostText.bind(this);
    this.onChangePostAuthorName = this.onChangePostAuthorName.bind(this);
    this.onChangePostEmail = this.onChangePostEmail.bind(this);
    this.onChangePostPhone = this.onChangePostPhone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      text: "",
      authorName: "",
      email: "",
      phone: ""
    };
  }

  onChangePostTitle(e) {
    this.setState({
      title: e.target.value
    });
  }
  onChangePostText(e) {
    this.setState({
      text: e.target.value
    });
  }
  onChangePostAuthorName(e) {
    this.setState({
      authorName: e.target.value
    });
  }
  onChangePostEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangePostPhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      title: this.state.title,
      text: this.state.text,
      authorName: this.state.authorName,
      email: this.state.email,
      phone: this.state.phone
    };
    axios
      .post("http://localhost:4000/posts/create", obj)
      .then(res => console.log(res.data));

    this.props.history.push("/");
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit} className="edit-post post">
          <div className="edit-post__author">
            {/* <input type="file" alt="" className="edit-post__author__image" /> */}
            <input
              type="text"
              className="edit-post__author__name"
              placeholder="Имя"
              value={this.state.authorName}
              onChange={this.onChangePostAuthorName}
            />
          </div>
          <div className="edit-post__content">
            <input
              type="text"
              className="edit-post__content__title"
              placeholder="Заголовок"
              value={this.state.title}
              onChange={this.onChangePostTitle}
            />
            <textarea
              type="text"
              className="edit-post__content__text"
              placeholder="Текст"
              value={this.state.text}
              onChange={this.onChangePostText}
            />
          </div>
          <div className="edit-post__contacts">
            <input
              type="text"
              className="edit-post__contacts__email"
              placeholder="E-mail"
              value={this.state.email}
              onChange={this.onChangePostEmail}
            />
            <input
              type="text"
              className="edit-post__contacts__phone"
              placeholder="Телефон"
              value={this.state.phone}
              onChange={this.onChangePostPhone}
            />
          </div>
          <input type="submit" value="Сохранить" className="edit-btn" />
        </form>
      </div>
    );
  }
}
