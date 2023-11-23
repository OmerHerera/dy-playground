export function getValue(key) {
  // First try to get it from URL querystring
  console.log(`🔍 Trying to get: ${key} from queryString`);
  const urlParams = new URLSearchParams(window.location.search);
  let value = urlParams.get(key);
  if (value) {
    console.log(`✅ Got: ${key} from queryString, value: ${value}`);
    return value;
  } else {
    console.log(`🧹 Not in queryString, Trying to get: _qa_${key} from localStorage`);
    value = localStorage.getItem(`_qa_${key}`);
    return value;
  }
}

export function saveURLSearchParams() {
  console.log('💾 Saving QueryParams into localStorage')
  if (window.location.search) {
   const urlParams = new URLSearchParams(window.location.search);
    for (const [key, value] of urlParams.entries()) {
      localStorage.setItem(`_qa_${key}`, value);
    }
  }
}
export function getURLSearchParams() {
  if (window.location.search) {
    const urlParams = new URLSearchParams(window.location.search);
     for (const [key, value] of urlParams.entries()) {
      //  localStorage.setItem(`_qa_${key}`, value);
     }
   }
}

export function goToNavigation(type) {
  let navType = '';
  switch (type) {
    case "/":
      navType =  `/${window.location.search}`
      break;
      case "shop":
        navType =  `/shop${window.location.search}`
      break;
      case "cart":
        navType =  `/cart${window.location.search}`
        break;
  }
  return navType;
}


export function setURLSearchParams() {
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

export function insertScript(path) {
  const script = document.createElement("script");
  script.src = path;
  script.type = "text/javascript";
  script.async = true;
  document.head.appendChild(script);
}

export function insertEmbedCode() {
  const name = decodeURIComponent(getValue('embedCode'));
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
export function init() {
  insertEmbedCode();
  console.log('🧰 App inserting DY scripts');
  const sectionId = getValue('sectionId');
  const cdn = getValue('cdn') || 'https://cdn.dynamicyield.com/api';
  const fullPath = `${cdn}/${sectionId}`;
  if (sectionId && fullPath) {
    insertScript(`${fullPath}/api_dynamic.js`);
    insertScript(`${fullPath}/api_static.js`);
    saveURLSearchParams();
    setURLSearchParams();
  } else {
    console.log(`🔴 Missing one of the following sectionId: ${sectionId} fullPath: ${fullPath}`);
  }
}