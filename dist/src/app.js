"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const hbs_1 = __importDefault(require("hbs"));
const geocode_1 = require("./utils/geocode");
const forecast_1 = require("./utils/forecast");
const app = express_1.default();
const port = process.env.PORT || 3000;
// path for express config
const viewsPath = path_1.default.join(__dirname, "/templates");
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
const partialsPath = path_1.default.join(__dirname, "/partials");
// path for handlebars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs_1.default.registerPartials(partialsPath);
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
    geocode_1.geocode(req.query.address, (e, { latitude = 0, longitude = 0, location }) => {
        if (e) {
            return res.send({ e });
        }
        forecast_1.forecast(latitude, longitude, (e, forecastData) => {
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
//# sourceMappingURL=app.js.map