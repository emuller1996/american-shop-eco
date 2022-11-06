import * as bootstrap from 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router } from 'react-router-dom';
import TemplateBase from './templates/TemplaBase';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <TemplateBase bootstrap={bootstrap} />

      </div>
    </Router>
  );
}

export default App;

