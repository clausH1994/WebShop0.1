import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDgYTYkm7OoXw0XGFPXAk0PoJLVgocukZk",
        authDomain: "shoeshop-8840b.firebaseapp.com",
        databaseURL: "https://shoeshop-8840b.firebaseio.com",
        projectId: "shoeshop-8840b",
        storageBucket: "shoeshop-8840b.appspot.com",
        messagingSenderId: "45286629778",
        appId: "1:45286629778:web:14b6c84cc34c1d7bee214b",
        measurementId: "G-7ZZ37CWE8"
};

export const  fb = firebase.initializeApp(firebaseConfig);
export const  db = firebase.firestore();
export const dbShoeAdd = db.collection('shoeItems');
export const dbOrderAdd = db.collection('orderItems');