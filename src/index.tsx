import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
    <App />
);

