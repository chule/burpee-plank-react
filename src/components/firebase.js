
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCkYvWXpyG2NFhOTI-ZAB02qgD4FA-u4QU",
    authDomain: "burpeeplank.firebaseapp.com",
    databaseURL: "https://burpeeplank.firebaseio.com",
    projectId: "burpeeplank",
    storageBucket: "burpeeplank.appspot.com",
    messagingSenderId: "951149967595"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();