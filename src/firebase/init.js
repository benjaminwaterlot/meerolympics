import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: 'AIzaSyDMPiBmDPTFhOLWKiXQywPaD0C0KFZQR8o',
  authDomain: 'champeero.firebaseapp.com',
  databaseURL: 'https://champeero.firebaseio.com',
  projectId: 'champeero',
  storageBucket: '',
  messagingSenderId: '722419987047',
  appId: '1:722419987047:web:3bbed599c968222a'
}

firebase.initializeApp(config)
