const API_URL = "";
const API_AUTH_URL = "";
const HOST_URL = "";
const SITE_URL = "";
const MAP_KEY = "";
export const environment = {
  production: false,
  imagePath: HOST_URL + '',
  apiUrl: API_URL,
  authUrl: API_AUTH_URL,
  siteUrl: SITE_URL,
  mapKey: MAP_KEY,
  firebaseConfig : {
    apiKey: "AIzaSyAzGs1YqUvDMcEVzB-uQcouS1_vAqW9P-0",
    authDomain: "ecole-c5cb9.firebaseapp.com",
    projectId: "ecole-c5cb9",
    storageBucket: "ecole-c5cb9.appspot.com",
    messagingSenderId: "283460461623",
    appId: "1:283460461623:web:87732b6975324a8e66cbb2"
  },
  pusher: {
    key: 'f477dc19a6f4d845d6bc',
    host: '',
    port: '443',
    scheme: 'https',
    cluster: 'eu',
  },
};

