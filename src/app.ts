import express from "express";
import path from "path";
import hbs from "hbs";
import { geocode } from "./utils/geocode";
import { forecast } from "./utils/forecast";

const app = express();
const port = process.env.PORT || 3000;

// path for express config
const viewsPath = path.join(__dirname, "/templates");
app.use(express.static(path.join(__dirname, "../public")));
const partialsPath = path.join(__dirname, "/partials");

// path for handlebars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (_req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Hans",
  });
});

app.get("/about", (_req, res) => {
  res.render("about", {
    title: "About me",
    name: "Hans",
  });
});

app.get("/help", (_req, res) => {
  res.render("help", {
    helptext: "If you need help contact hans.m.celestin@gmail.com",
    title: "Help",
    name: "Hans",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address",
    });
  }
  if (typeof req.query.address !== "string") {
    return res.send({
      error: "you must provide an address as a string",
    });
  }

  geocode(req.query.address, (e, { latitude = 0, longitude = 0, location }) => {
    if (e) {
      return res.send({ e });
    }
    forecast(latitude, longitude, (e, forecastData) => {
      if (e) {
        return res.send({ e });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("*", (_req, res) => {
  res.render("404", {
    title: "404",
    name: "Hans",
    errorMessage: "page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
