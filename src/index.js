let poly = require("preact-cli/lib/lib/webpack/polyfills");

import { h } from "preact";
import habitat from "preact-habitat";

import Widget from "./components/hello-world";

import searchTest from "./components/autocomplete-test.js";

let _habitat = habitat(searchTest);

_habitat.render({
  selector: '[data-widget-host="habitat"]',
  clean: true
});
