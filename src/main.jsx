import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM
import './index.css';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'jquery/dist/jquery.min.js';
import $ from 'jquery';
import { QueryClient, QueryClientProvider } from 'react-query';


window.$ = $;
window.jQuery = $;

const queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
  </React.StrictMode>
);








