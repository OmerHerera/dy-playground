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
      navType =  `/`
      // navType =  `/${window.location.search}`
      break;
      case "shop":
        navType =  `/shop`
        // navType =  `/shop${window.location.search}`
      break;
      case "cart":
        // navType =  `/cart${window.location.search}`
        navType =  `/cart`
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
        // window.history.pushState({}, '', url);
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
function getEnvironment() {
  const sectionId = getValue('sectionId'); 
  let env = 'us';
  if (sectionId && sectionId?.charAt(0) == '9') {
    env = 'eu';
  }
  return env;
}
export function init() {
  console.log('🧰 App inserting DY scripts');
  const env = getValue('env') || getEnvironment();
  const sectionId = getValue('sectionId'); 
  if (sectionId && !window.DYO) {
    injectDYScripts(env, sectionId)
    insertEmbedCode();
    saveURLSearchParams();
    // setURLSearchParams();
  } else {
    console.log(`🔴 Missing one of the following sectionId: ${sectionId}`);
  }
}

function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}
function createLink(href, rel) {
  const link = document.createElement('link');
  link.rel  = rel;
  link.href = href;
  return link;
}
function injectDYScripts(env, sectionId) {
  const urls = { 
    us: ['//rcom.dynamicyield.com', '//st.dynamicyield.com', '//cdn.dynamicyield.com'],
    eu: ['//rcom-eu.dynamicyield.com', '//st-eu.dynamicyield.com', '//cdn-eu.dynamicyield.com'],
    dev: ['//rcom.dynamicyield.com', '//st.dynamicyield.com', `//cdn-dev.dynamicyield.com/dev-use1-${env}`]
  };
  
  // the following line its for getting the URLs from the urls in 'dev' key
  env = (env !== 'us' && env !== 'eu') ? 'dev' : env
  
  const el = document.getElementById('preconnect')
  urls[env].forEach(element => {
    const dnsPrefetchLinkEl = createLink(element, 'dns-prefetch');
    const preconnectLinkEl = createLink(element, 'preconnect');
    insertAfter(dnsPrefetchLinkEl, el);
    insertAfter(preconnectLinkEl, el);
  });
  const pathScript = urls[env][2];
  document.getElementById('api_dynamic').src = `${pathScript}/api/${sectionId}/api_dynamic.js`;
  document.getElementById('api_static').src = `${pathScript}/api/${sectionId}/api_static.js`;;
}
