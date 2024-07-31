import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import{getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js"
import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"




const firebaseConfig = {
    apiKey: "AIzaSyBjRIOaczD744hd0Y6tCLLgPaRAxOfrF9Q",
    authDomain: "compass-navigation-37725.firebaseapp.com",
    projectId: "compass-navigation-37725",
    storageBucket: "compass-navigation-37725.appspot.com",
    messagingSenderId: "664993111336",
    appId: "1:664993111336:web:0ac3f64af62fdc5358041d"
    };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUser');
    if(loggedInUserId){
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserEmail').innerText=userData.Email;
                document.getElementById('loggedUserLName').innerText=userData.lastName;
            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("user Id not Found in Local Storage");
    }
  })

  const logoutButton=document.getElementsByName('logout');
  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='index.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  })
