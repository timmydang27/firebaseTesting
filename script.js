/*
fire base authentication
const auth = firebase.auth();

sign in w/ email and password
auth.signInWithEmailAndPassword(email, pass);

sign up w/ email and password
auth.createUserWithEmailAndPassword(email, pass); 

checks to see if user is logged in/logged out, changes when user logs in/out
auth.onAuthStateChanged(firebaseUser =>{});

*/

var username;
var isAUser;
var theName = "Null";
let interestArray;


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDa_XajvIJCpNiwrTwN5m6SFCrn3KW0Ylc",
    authDomain: "fir-testing-96f00.firebaseapp.com",
    databaseURL: "https://fir-testing-96f00.firebaseio.com",
    projectId: "fir-testing-96f00",
    storageBucket: "fir-testing-96f00.appspot.com",
    messagingSenderId: "386966510581",
    appId: "1:386966510581:web:023407dc11b720ffb5debc",
    measurementId: "G-2PH1K5FFGG"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  firebase.analytics();
  
  window.onload = () => {
    initApp();
  }
  function logIn(){
    const email = document.getElementById("email").value;
    console.log(email);

    const password = document.getElementById("password").value;
    console.log(password);

    const loginbtn = document.getElementById("login");
    console.log(loginbtn.id);

    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise
      .then(user => console.log(user));
    promise
      .catch(e => console.log(e.message));

    initApp();
}

function signUp(){
  const email = document.getElementById("email").value;
  console.log(email);

  const password = document.getElementById("password").value;
  console.log(password);

  const signUpbtn = document.getElementById("signUp");
  console.log(signUpbtn.id);

  const auth = firebase.auth();
  const promise = auth.createUserWithEmailAndPassword(email, password);
  promise
    .then(user => console.log(user));
  promise 
    .catch(e => console.log(e.message));
  
  initApp();
}

function signOut(){
  const promise = firebase.auth().signOut();
  promise
    .then(console.log("signed out"));
  promise
    .catch(e => console.log(e.message));
  
}

function getUsername(){
  theName = document.getElementById("name").value;
  initApp();
}

//Add a realtime event listener
function initApp(){
  // declare auth
  const auth = firebase.auth();
  const promise = auth.onAuthStateChanged(user =>{
    
    // print statement to see if init is called
    console.log("check status");
    
    // check if logged in
    if(user){
      // print if logged in
      console.log("signed in");  
      console.log(user);
      console.log("username before update " + username);
      
      const update = user.updateProfile({
        displayName: username
        
      })
      
      console.log(username);
      //check for succes or error
      update
      .then(console.log("updated username"));
      update
      .catch(e => console.log(e.message));
      
      //second user print
      console.log(user);  
      userData(user.uid, theName);
     
    }
    else{
      isAUser = false;
      console.log("not logged");
    }
    console.log(interestArray);
    if (interestArray !== null) {
      writeUserInterest(user.uid, interestArray);
      interestArray = [];
     console.log("hello");
  }
  });
}


function setInterest(){
  interestList = document.getElementById("interest").value;
  interestArray = seperateInterests(interestList);
  console.log(interestArray);
  initApp();
}


  function seperateInterests(interestList){
    var start = 0;
    var end;
    var interestArray = [];
    for(var i = 0; i < interestList.length; i++){
      if(interestList.substring(i, i+1)===","){
        end = i;
        interestArray.push(interestList.substring(start, end));
        start = end+1;
      }
      if(i == interestList.length - 1){
        interestArray.push(interestList.substring(start, i+1));
      }
    }
    return interestArray;
  }

  function writeUserInterest(userId, interests){
    for (var i = 0 ; i < interests.length;i++) {
        firebase.database().ref("users/" + userId +"/interests").push(interests[i]);
    }
}
function userData(userId, nameOfUser) {
  console.log(userId);
  firebase.database().ref("user/" + userId).set({
    name: nameOfUser
});
database.ref("user/" + userId).child("name").on("value", snap => {
  console.log("database username: " + snap.val());
});
}