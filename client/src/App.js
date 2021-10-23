import { Provider } from "react-redux";
import store from "./store";
import AppBody from "./AppBody";
import { create } from "jss";
import { createTheme } from "@material-ui/core/styles";
import rtl from "jss-rtl";
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Israel/Jerusalem");
import {
  StylesProvider,
  ThemeProvider,
  jssPreset,
} from "@material-ui/core/styles";
const theme = createTheme({
  direction: "rtl",
});
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function App() {
  return (
    <Provider store={store}>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <AppBody />
        </ThemeProvider>
      </StylesProvider>
    </Provider>
  );
}

export default App;
