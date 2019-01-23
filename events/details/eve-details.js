var config = {
    apiKey: "AIzaSyAZHCLuovX2oNhccuxjetkHNgAcrWcZLGo",
    authDomain: "dhisna-ac7e0.firebaseapp.com",
    databaseURL: "https://dhisna-ac7e0.firebaseio.com",
    projectId: "dhisna-ac7e0",
    storageBucket: "dhisna-ac7e0.appspot.com",
    messagingSenderId: "1079389260336"
};
firebase.initializeApp(config);

function showdetails(branch, event) {
    var database = firebase.database().ref().child('events/');
    det = document.getElementById('detail-content');
    rul = document.getElementById('rules-content');
    cap = document.getElementById('eve-caption');
    fee = document.getElementById('eve-fee');
    on1 = document.getElementById('org1-name');
    op1 = document.getElementById('org1-ph');
    on2 = document.getElementById('org2-name');
    op2 = document.getElementById('org2-ph');
    storage = firebase.storage();
    var sn = localStorage.getItem("events");
    if(sn){
        snap = JSON.parse(sn);
        console.log(snap);
        getdetails(snap[branch][event]);
        load = document.getElementById("loading");
        load.parentNode.removeChild(load);

        database.once('value', function (snap) {
            localStorage.setItem("events", JSON.stringify(snap));
        })
    }
    else {
        database.once('value', function (snap) {
            getdetails(snap.val()[branch][event])

        }).then(function () {
            load = document.getElementById("loading");
            load.parentNode.removeChild(load);

        });
    }

}
function getdetails(snap) {
    document.getElementById('eve-name').innerHTML = event;
    cap.innerHTML = snap.caption;
    det.innerText = snap.description;
    rul.innerText = snap.rules;
    fee.innerHTML = "REGISTRATION FEE: " + snap.fee;
    on1.innerHTML = snap.coordinators.crd1.name;
    op1.innerHTML = snap.coordinators.crd1.number;
    on2.innerHTML = snap.coordinators.crd2.name;
    op2.innerHTML = snap.coordinators.crd2.number;
    insta_link = snap.insta;
    if (!insta_link){
        reg = document.getElementById("payment");
        reg.parentNode.removeChild(reg);
        fee.parentNode.removeChild(fee);
    }
    storage.ref('events/' + branch + "/" + event + "/cr1.jpg").getDownloadURL().then(function (url) {

        console.log(url);
        var org = document.getElementById('org1-img');
        org.src = url;
    }).catch(function (error) {
        console.log(error)
        // Handle any errors
    });
    storage.ref('events/' + branch + "/" + event + "/crd2.jpg").getDownloadURL().then(function (url) {
        console.log(url);
        var org = document.getElementById('org2-img');
        org.src = url;
    }).catch(function (error) {
        console.log(error)
        // Handle any errors
    });
}

function pay() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            firebase.database().ref('/events/' + branch + '/' + event).once('value').then(function (snapshot) {
                eve = snapshot.val();
                insta_link = eve.insta;
                field= eve.insta_uid;
                insta_link += "?data_"+field+"=";
                uuid = user.uid;
                insta_link += uuid;
                insta_link += "&data_readonly=data_"+field;
                button = document.getElementsByClassName("im-checkout-btn")[0];
                di = document.getElementById("payment");
                console.log(button);
                button.href= insta_link;
                di.style.display="block";


            });
        }
        else {
            document.location = "../../signup"
        }

    });
}
document.addEventListener("DOMContentLoaded", function(event) {
    //do work
    pay()
});