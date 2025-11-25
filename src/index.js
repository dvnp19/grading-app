import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // <-- use HashRouter for GH Pages
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>,
);

reportWebVitals();