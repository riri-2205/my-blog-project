import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req,res) => {
    res.render("home", {posts});
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postTitle", (req, res) => {
  const requestedTitle = req.params.postTitle.toLowerCase();
  const foundPost = posts.find(
    (post) => post.title.toLowerCase() === requestedTitle
  );

  if (foundPost) {
    res.render("post", { title: foundPost.title, content: foundPost.content });
  } else {
    res.status(404).send("Post not found.");
  }
});


app.listen(port, () => {
    console.log(`Server running on port; ${port}`);
});
