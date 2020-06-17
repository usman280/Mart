import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBfMcoHRa5Y7AFscXpd_PFjPN9Yjar2xZ4",
    authDomain: "minimini-1419b.firebaseapp.com",
    databaseURL: "https://minimini-1419b.firebaseio.com",
    projectId: "minimini-1419b",
    storageBucket: "minimini-1419b.appspot.com",
    messagingSenderId: "378368766803",
    appId: "1:378368766803:web:13aa66206b4cbc85eae7a6",
    measurementId: "G-NQ926MPEHR"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
