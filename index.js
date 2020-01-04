const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const exphbs = require("express-handlebars");
const todoRoutes = require("./routes/todos");

const password = "1q2w3e4r5t6y";
const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(todoRoutes);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://Karlson:${password}@cluster0-lmdff.mongodb.net/todos`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    app.listen(PORT, () => {
      console.log(`Server has been started on port $${PORT}`);
    });
  } catch (er) {
    console.warn("errro", er);
  }
};

start();
