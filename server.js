const express = require("express");
const app = express();
const PORT = 3030;

const createUser = () => {
  let users = [];
  for (let i = 1; i <= 100; i++) {
    const user = {
      id: parseInt(`${i}`),
      username: `user${i}`,
      email: `user${i}@hotmail.com`,
      password: `p${i}ssword`,
      address: `${i} infinite loop`,
    };
    users.push(user);
  }
  return users;
};
const createdUsers = createUser();

const createPost = () => {
  let posts = [];
  for (let i = 1; i <= 100; i++) {
    const post = {
      id: parseInt(`${i}`),
      post: `post${i}`,
    };
    posts.push(post);
  }
  return posts;
};
const createdPosts = createPost();

const paginatedResults = (model) => {
  return (req, res, next) => {
    const page = req.query.page ? parseInt(req.query.page) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    console.log("page", page, "limit", limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < model.length)
      results.nextPage = {
        page: page + 1,
        limit: limit,
      };

    if (startIndex > 0)
      results.previousPage = {
        page: page - 1,
        limit: limit,
      };

    results.users = model.slice(startIndex, endIndex);
    res.paginatedResponce = results;
    next();
  };
};

app.get("/users", paginatedResults(createdUsers), async (req, res) => {
  try {
    res.json(res.paginatedResponce);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/posts", paginatedResults(createdPosts), async (req, res) => {
  try {
    res.json(res.paginatedResponce);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port:${PORT}`);
});

//   console.log("page", page, "limit", limit);

//   let pageAsNumber = 0;
//   if (!Number.isNaN(page) && page > 0) {
//     page = pageAsNumber;
//   }

//   let limitAsNumber = 0;
//   if (!Number.isNaN(limit) && limit > 0 && limit < 10) {
//     limit = limitAsNumber;
//   }
