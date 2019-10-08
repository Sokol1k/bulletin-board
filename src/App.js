import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

import PostsList from "./components/js/PostsList";
import PostVeiw from "./components/js/PostVeiw";
import PostAuthor from "./components/js/PostAuthor";
import EditPost from "./components/js/EditPost";
import RemovePost from "./components/js/RemovePost";
import CreatePost from "./components/js/CreatePost";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <header className="header">
            <div className="container">
              <div className="content">
                <Link to="/" className="logo">
                  Доска объявлений
                </Link>
              </div>
            </div>
          </header>

          <Route path="/" exact component={PostsList} />
          <Route path="/post=:id" exact component={PostVeiw} />
          <Route path="/name=:name" exact component={PostAuthor} />
          <Route path="/update/:id" exact component={EditPost} />
          <Route path="/remove/:id" exact component={RemovePost} />
          <Route path="/create" exact component={CreatePost} />
        </div>
      </Router>
    );
  }
}

export default App;
