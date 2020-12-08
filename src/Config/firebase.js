import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyDWmrXOaWvNirRrJBsZyVS1HGbUww_QfN8",
    authDomain: "practice-914ce.firebaseapp.com",
    databaseURL: "https://practice-914ce.firebaseio.com",
    projectId: "practice-914ce",
    storageBucket: "practice-914ce.appspot.com",
    messagingSenderId: "526719974216",
    appId: "1:526719974216:web:082724d6462567f3c5d17d"
  };
  // Initialize Firebase
  const fire= firebase.initializeApp(firebaseConfig);

  export default fire