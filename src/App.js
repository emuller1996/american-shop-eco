import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TemplateBase from "./templates/TemplaBase";
import "./App.css";
import DasboardTemplate from "./templates/DashboardTemplate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRouteMiProfile from "./utils/ProtectedRouteMiProfile";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path={"/d"}>
            <ProtectedRouteMiProfile>
              <DasboardTemplate />
            </ProtectedRouteMiProfile>
          </Route>
          <Route path={"/"}>
            <TemplateBase bootstrap={bootstrap} />
          </Route>
        </Switch>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
