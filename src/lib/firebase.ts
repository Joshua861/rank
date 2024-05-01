// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAoLka1UaTcNNR01UF2T19lr4tGdIQXdJU',
	authDomain: 'rank-cce72.firebaseapp.com',
	projectId: 'rank-cce72',
	storageBucket: 'rank-cce72.appspot.com',
	messagingSenderId: '349892447062',
	appId: '1:349892447062:web:765fb9d3344c7760bea4f7'
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
