import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TemplateBase from './templates/TemplaBase';
import './App.css';
import DasboardTemplate from './templates/DashboardTemplate';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>

        <Route  path={'/Dashboard'}>
            <DasboardTemplate />
          </Route>
          <Route path={'/'}>
            <TemplateBase bootstrap={bootstrap} />
          </Route>

          


        </Switch>

      </div>
    </Router>
  );
}

export default App;

