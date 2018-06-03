import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import {VideoList} from './components/VIdeoList';

ReactDOM.render(
  <VideoList/>,
  document.getElementById("example")
);