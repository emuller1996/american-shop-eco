import logo from './logo.svg';
import * as bootstrap from 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.css';
import Nav from './components/Nav/Nav';
import BannerCarousel from './components/Home/BannerCarousel';
import BannerCategoryMoth from './components/Home/BannerCategoryMoth';
import Footer from './components/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import TemplateBase from './templates/TemplaBase';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <TemplateBase />

      </div>
    </Router>
  );
}

export default App;

