var config = {
    apiKey: "AIzaSyAZHCLuovX2oNhccuxjetkHNgAcrWcZLGo",
    authDomain: "dhisna-ac7e0.firebaseapp.com",
    databaseURL: "https://dhisna-ac7e0.firebaseio.com",
    projectId: "dhisna-ac7e0",
    storageBucket: "dhisna-ac7e0.appspot.com",
    messagingSenderId: "1079389260336"
};
firebase.initializeApp(config);

var database = firebase.database();


function SwapDivsWithClick(div1, div2) {
    d1 = document.getElementById(div1);
    d2 = document.getElementById(div2);
    if (d2.style.display == "none") {
        d1.style.display = "none";
        d2.style.display = "block";
    }
    else {
        d1.style.display = "block";
        d2.style.display = "none";
    }
}


function createuser() {

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var name = document.getElementById("name").value;
    var college = document.getElementById("college").value;
    var phone = document.getElementById("phone").value;
    var gender = document.getElementById("gender").value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {

        user = firebase.auth().currentUser;
        if (user) {
            // User is signed in.
            var userId = user.uid;
            database.ref('users/' + userId).update({
                name: name,
                email: email,
                college: college,
                phone: phone,
                gender: gender
            }).then(function () {
                // write what happens after registration is compete
                alert("registration succesfull");
                SwapDivsWithClick('signup', 'photoupload')


            });
        }
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        alert("registration failed try again")
    });
}

function register() {


    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function () {
        createuser()
    }).catch(function (error) {
        if (error) {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function () {
                createuser();
            });
        }
    });
}

function loguser() {
    var email = document.getElementById("emailin").value;
    var password = document.getElementById("passwordin").value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        window.location = "../index.html"
    }).catch(function (error) {

        var errorCode = error.code;
        var errorMessage = error.message;

    });

}

function login() {

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function () {
        loguser()
    }).catch(function (error) {
        if (error) {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function () {
                loguser()
            })
        }
    });
}

function forget() {
    var email = document.getElementById("emailfor").value;
    firebase.auth().sendPasswordResetEmail(email).then(function () {
        alert('Password Reset Email Sent!');
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/invalid-email') {
            alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
            alert(errorMessage);
        }
        console.log(error);
    });
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        document.location = "../"
    }

    else {
    }
});

