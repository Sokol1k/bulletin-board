const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 4000;
const app = express();
const postsRoutes = express.Router();
const Post = require("./postsSchema");

app.use(cors());
app.use(bodyParser.json());

mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(
    "mongodb+srv://Danil:password12345@cluster0-0lzhj.mongodb.net/bulletin-board?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.log(err);
  });

// List posts
postsRoutes.route("/").get((req, res) => {
  Post.find((err, posts) => {
    if (err) {
      console.log(err);
    } else {
      res.json(posts);
    }
  }).sort({ updatedAt: -1 });
});

// Create Post
postsRoutes.route("/create").post((req, res) => {
  const post = new Post(req.body);
  post
    .save()
    .then(post => {
      res.status(200).json({ post: "post added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new post failed");
    });
});

//Read post
postsRoutes.route("/:id").get((req, res) => {
  Post.findById({ _id: req.params.id }, (err, post) => {
    res.json(post);
  });
});

//Post update
postsRoutes.route("/update/:id").post((req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (!post) {
      res.status(404).send("data is not found");
    } else {
      post.title = req.body.title;
      post.text = req.body.text;
      post.authorName = req.body.authorName;
      post.email = req.body.email;
      post.phone = req.body.phone;

      post
        .save()
        .then(post => {
          res.json("Post updated");
        })
        .catch(err => {
          res.status(400).send("Updated not possible");
        });
    }
  });
});

//Post delete
postsRoutes.route("/remove/:id").delete((req, res) => {
  Post.deleteOne({ _id: req.params.id }, (err, post) => {
    if (post) {
      res.json("Post deleted");
    } else {
      res.status(400).send("Post not deleted");
    }
  });
});

app.use("/posts", postsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
