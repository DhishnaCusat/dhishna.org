
var config = {
    apiKey: "AIzaSyAZHCLuovX2oNhccuxjetkHNgAcrWcZLGo",
    authDomain: "dhisna-ac7e0.firebaseapp.com",
    databaseURL: "https://dhisna-ac7e0.firebaseio.com",
    projectId: "dhisna-ac7e0",
    storageBucket: "dhisna-ac7e0.appspot.com",
    messagingSenderId: "1079389260336"
};
firebase.initializeApp(config);


function add_details(snapshot,insta_link) {
    console.log(snapshot);


    insta_link+="&data_name="+snapshot.name;
    insta_link+="&data_email="+snapshot.email;
    insta_link+="&data_phone="+snapshot.phone;

    insta_link+="&data_readonly=data_name&data_readonly=data_email&data_readonly=data_phone";

    button = document.getElementsByClassName("im-checkout-btn")[0];
    di = document.getElementById("payment");
    console.log(button);
    button.href= insta_link;
    di.style.display="block";
}
function addpayment(eve,user) {
    insta_link = eve.insta;
    field= eve.insta_uid;
    insta_link+="?";
    if(field) {
        insta_link += "data_" + field + "=";
        uuid = user.uid;
        insta_link += uuid;
        insta_link += "&data_readonly=data_" + field;
    }
    var us = localStorage.getItem("user");
    us = JSON.parse(us);
    if(us){
        add_details(us, insta_link)
    }
    else {
        firebase.database().ref('/users/' + user.uid).once("value").then(function (snapshot) {
            console.log(snapshot.val());
            localStorage.setItem("user", JSON.stringify(snapshot));
            add_details(snapshot.val(), insta_link)


        });
    }
}
function changelocataion(){
    localStorage.setItem("branch",branch);
    localStorage.setItem("event",event);
    document.location = "../../signup"

}
function pay() {
    branch="cs";
    event = "CodeStorm";
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            redirect= document.getElementById("redirect");
            redirect.parentNode.removeChild(redirect);
            var sn = localStorage.getItem("events");
            sn = JSON.parse(sn);
            if(sn){
                console.log(sn);
                addpayment(sn[branch][event],user)
            }
            else {
                firebase.database().ref('/events/' + branch + '/' + event).once('value').then(function (snapshot) {
                    addpayment(snapshot.val(), user)
                });
            }
        }
        else {

        }

    });
}
document.addEventListener("DOMContentLoaded", function(event) {
    //do work
    pay()
});

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        var e  = document.getElementsByClassName('payment');
        e[0].removeAttribute("data-behaviour");
        e[0].setAttribute("data-behaviour","link");
        e[1].removeAttribute("data-behaviour");
        e[1].setAttribute("data-behaviour","link");
    }
}
getMobileOperatingSystem()