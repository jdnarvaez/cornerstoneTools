//import stackPrefetch from '../stackTools/stackPrefetch.js';

// Maximum concurrent connections to the same server
// Information from http://sgdev-blog.blogspot.fr/2014/01/maximum-concurrent-connection-to-same.html
const maxSimultaneousRequests = {
  default: 6,
  IE: {
    9: 6,
    10: 8,
    default: 8
  },
  Firefox: {
    default: 6
  },
  Opera: {
    10: 8,
    11: 6,
    12: 6,
    default: 6
  },
  Chrome: {
    default: 6
  },
  Safari: {
    default: 6
  }
};

// Browser name / version detection
// http://stackoverflow.com/questions/2400935/browser-detection-in-javascript
function getBrowserInfo () {
  const ua = navigator.userAgent;
  let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  let tem;

  if (/trident/i.test(M[1])) {
    tem = (/\brv[ :]+(\d+)/g).exec(ua) || [];

    return `IE ${tem[1] || ''}`;
  }

  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if (tem !== null) {
      return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
  }

  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) !== null) {
    M.splice(1, 1, tem[1]);
  }

  return M.join(' ');
}

function getMaxSimultaneousRequests () {
  //const config = stackPrefetch.getConfiguration();

    // Give preference to user-chosen values
  //if (config.maxSimultaneousRequests) {
  //  return config.maxSimultaneousRequests;
  //}

  return getDefaultSimultaneousRequests();
}

function getDefaultSimultaneousRequests () {
  const infoString = getBrowserInfo();
  const info = infoString.split(' ');
  const browserName = info[0];
  const browserVersion = info[1];
  const browserData = maxSimultaneousRequests[browserName];

  if (!browserData) {
    return maxSimultaneousRequests.default;
  }

  if (!browserData[browserVersion]) {
    return browserData.default;
  }

  return browserData[browserVersion];
}

function isMobileDevice () {
  const pattern = new RegExp('Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini');


  return pattern.test(navigator.userAgent);
}

export {
  getDefaultSimultaneousRequests,
  getMaxSimultaneousRequests,
  getBrowserInfo,
  isMobileDevice
};
