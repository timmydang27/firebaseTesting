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
  //firebase.analytics();

  //Get Elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignup = document.getElementById('btnSignup');
  const btnLogout = document.getElementById('btnLogout');

  //Add Login Event
  btnLogin.addEventListener('click', e => {
      //Get Email & Password
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();
      //Sign in
      const promise = auth.signInWithEmailAndPassword(email, pass);
      promise.catch(e => console.log(e.message));

  });

  btnSignUp.addEventListener('click', e => {
   //Get Email & Password
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        //Sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));


  })

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
   })

//Add a realtime event listener
firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser){
    console.log(firebaseUser);
    btnLogout.classList.remove('hide');
    }else{
    console.log('not logged in');
    btnLogout.classList.add('hide');
    }
    });


