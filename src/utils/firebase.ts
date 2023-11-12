import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyDCKKKfDeOIA3alWdtLV_fvxjscybEB08g",
    authDomain: "mart-store-ecommerce-products.firebaseapp.com",
    projectId: "mart-store-ecommerce-products",
    storageBucket: "mart-store-ecommerce-products.appspot.com",
    messagingSenderId: "712300656418",
    appId: "1:712300656418:web:5ec0e4144c9dd5151e177b",
    measurementId: "G-CMCC9MWWSL"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  const firestore = getFirestore(app);


  export { auth, firestore };
  export default app;
