const { Router } = require("express");
const Todo = require("../models/Todo");
const router = Router();

router.get("/", async (req, res) => {
  const todos = await Todo.find({});
  res.render("index", {
    title: "todos list",
    isIndex: true,
    todos
  });
});

router.get("/create", (req, res) => {
  res.render("create", {
    title: "create todo",
    isCreate: true
  });
});

router.post("/create", async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title
    });

    await todo.save();
    res.redirect("/");
  } catch (er) {
    console.warn("errror in router --- ", er.message);
  }
});

router.post("/complete", async (req, res) => {
  try {
    const todo = await Todo.findById(req.body.id);
    todo.completed = !!req.body.completed;
    await todo.save();
    res.redirect("/");
  } catch (er) {
    console.warn("errror in router --- ", er.message);
  }
});

module.exports = router;
