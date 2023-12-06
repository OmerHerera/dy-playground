import CryptoJS from 'crypto-js';
export const localStorageNames = {
  dy_playground_context: 'dy_playground_context',
  dy_playground_context_data: 'dy_playground_context_data',
  dy_playground_context_lng: 'dy_playground_context_lng',
};
export const extraContextData = {
  data: 'data',
  lng: 'lng',
};

function sha256(str) {
  let wordArray = CryptoJS.SHA256(str);
  let hashedStr = wordArray.toString(CryptoJS.enc.Hex);
  return hashedStr;
}

export async function login(user, type) {
  // eslint-disable-next-line
  if (user && type && DY && DY.API) {
    let userCuid = user?.trim();
    let userType = type?.trim();
    // eslint-disable-next-line
    DY.API('event', {
      name: 'Login',
      properties: {
        dyType: 'login-v1',
        cuid: userCuid,
        cuidType: userType,
      },
    });
    return true;
  } else {
    console.log(`🔴 Missing one of the following: user,type or DY`);
  }
}

export async function optIn(user) {
  // eslint-disable-next-line
  if (user && DY && DY.API) {
    let email = user?.trim();
    // eslint-disable-next-line
    DY.API('event', {
      'name': 'message opt in',
      'properties': {
        'dyType': 'message-optin-v1',
        'cuidType': 'email',
        'plainTextEmail': email
      }
    });
    return true;
  } else {
    console.log(`🔴 Missing one of the following: user or DY`);
  }
}

export async function optOut(user) {
  // eslint-disable-next-line
  if (user && DY && DY.API) {
    let email = user?.trim();
    // eslint-disable-next-line
    DY.API('event', {
      'name': 'message opt out',
      'properties': {
        'dyType': 'message-optout-v1',
        'cuidType': 'he',
        'hashedEmail': sha256(email)
      }
    });
    return true;
  } else {
    console.log(`🔴 Missing one of the following: user or DY`);
  }
}

export async function manager(param, value, reload = false) {
  const url = new URL(window.location);
  url.searchParams.set(param, value);
  // eslint-disable-next-line
  history.pushState({}, "", decodeURIComponent(url));
  // Reload the page
  reload && window.location.reload();
  return true;
}

export async function setRecommendationContext({ type, extra, data }) {
  let contextType;
  let contextData;
  let contextLng;
  
  switch (extra) {
    case extraContextData.data:
      contextType = localStorage.getItem(localStorageNames.dy_playground_context);
      contextLng = localStorage.getItem(localStorageNames.dy_playground_context_lng);
      contextData = data;
      localStorage.setItem(localStorageNames.dy_playground_context_data, data);
      break;
    case extraContextData.lng:
      contextType = localStorage.getItem(localStorageNames.dy_playground_context);
      contextData = localStorage.getItem(localStorageNames.dy_playground_context_data);
      contextLng = data;
      localStorage.setItem(localStorageNames.dy_playground_context_lng, data);
      break;
    default:
      contextType = type;
      localStorage.setItem(localStorageNames.dy_playground_context, type);
      contextData = localStorage.getItem(localStorageNames.dy_playground_context_data);
      contextLng = localStorage.getItem(localStorageNames.dy_playground_context_lng);
      break;
  };

  // build the context object looks like, its possible that the object doesn't has all the properties:
  // DY.recommendationContext = {
  //   type: '',
  //   lng: '',
  //   data: '',
  // };

  const contextObj = {
    ...(contextType && {
      type: contextType,
    }),
    ...(contextData && {
      data: contextData.split(','),
    }),
    ...(contextLng && {
      lng: contextLng,
    })
  };
  
  window.DY.recommendationContext = contextObj;
  
  return true;
}

export async function addToCart() { 
}
