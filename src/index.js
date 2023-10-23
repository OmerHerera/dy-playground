import { inject } from '@vercel/analytics';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
window.addEventListener("beforeunload", function (e) {
  // localStorage.removeItem('_qa_sectionId');
  // localStorage.removeItem('_qa_cdn');
  for (var key in localStorage) {
    if (key.indexOf('_qa_') === 0) {
      localStorage.removeItem(key);
    }
  }
});

function getValue(key) {
  // First try to get it from URL querystring
  console.log(`Trying to get: ${key} from queryString`);
  const urlParams = new URLSearchParams(window.location.search);
  let value = urlParams.get(key);
  if (value) {
    return value;
  } else {
    console.log(`Not in queryString, Trying to get: _qa_${key} from localStorage`);
    value = localStorage.getItem(`_qa_${key}`);
    return value;
  }
}

function saveURLSearchParams() {
  if (window.location.search) {
   const urlParams = new URLSearchParams(window.location.search);
    for (const [key, value] of urlParams.entries()) {
      localStorage.setItem(`_qa_${key}`, value);
    }
  }
}

function setURLSearchParams() {
  // if not queryParams try to get if from localStorage
  if (!window.location.search) {
    for (var key in localStorage) {
      if (key.indexOf('_qa_') === 0) {
        const value = localStorage.getItem(key);
        const url = new URL(window.location);
        const normalizeKey = key.replace(/_qa_/g, '')
        url.searchParams.set(`${normalizeKey}`, `${value}`);
        window.history.pushState({}, '', url);
      }
    }
  }
}

function insertScript(path) {
  const script = document.createElement("script");
  script.src = path;
  script.type = "text/javascript";
  script.async = true;
  document.head.appendChild(script);
}
function insertSmartObjectCode() {
  const name = decodeURIComponent(getValue('smartObject'));
  if (name) {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.innerHTML = `
      setTimeout(()=> {
        if(window.DYO) {
          DYO.smartObject("${name}", {target: "dy_holder", inline: true});
    } else {
      console.log('No window.DYO ! ! !')
    }
  }, 1000);
  `;
    document.head.appendChild(s);
  }
}
function init() {
  insertSmartObjectCode();
  console.log('App inserting DY scripts');
  const sectionId = getValue('sectionId');
  const cdn = getValue('cdn') || 'cdn.dynamicyield.com';
  const fullPath = `https://${cdn}/api/${sectionId}`;
  if (sectionId && fullPath) {
    insertScript(`${fullPath}/api_dynamic.js`);
    insertScript(`${fullPath}/api_static.js`);
    saveURLSearchParams();
    setURLSearchParams();
  } else {
    console.log(`Missing one of the following sectionId: ${sectionId} fullPath: ${fullPath}`);
  }
}
inject();
init();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
