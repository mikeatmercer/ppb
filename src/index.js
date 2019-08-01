let poly = require("preact-cli/lib/lib/webpack/polyfills");


import habitat from "preact-habitat";

import Widget from "./components/App";

let insert = document.createElement('div') ;
insert.id = "insert-dropdown"; 
insert.setAttribute("style", "position: absolute; width: 100%; left: 0; top: 0; height: 1px; background: transparent; pointer-events: none")
document.querySelector("#s4-workspace").appendChild(insert);


let _habitat = habitat(Widget);

_habitat.render({
  selector: '[data-widget-host="habitat"]',
  clean: true
});
