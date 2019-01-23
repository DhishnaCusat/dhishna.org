var config = {
    apiKey: "AIzaSyAZHCLuovX2oNhccuxjetkHNgAcrWcZLGo",
    authDomain: "dhisna-ac7e0.firebaseapp.com",
    databaseURL: "https://dhisna-ac7e0.firebaseio.com",
    projectId: "dhisna-ac7e0",
    storageBucket: "dhisna-ac7e0.appspot.com",
    messagingSenderId: "1079389260336"
};
firebase.initializeApp(config);

function putindiv() {
    box = document.getElementsByClassName("container")[0];
    branches = document.createElement("div");
    branches.setAttribute("class", "row sec-container");
    tp = document.getElementById("event1");

    var database = firebase.database().ref().child('events/');
    number = 0;

    storage = firebase.storage();
    var sn = localStorage.getItem("events");
    if(sn){
        snap = JSON.parse(sn);
        console.log(snap);
        putdata(snap);
        box.appendChild(branches);
        load = document.getElementById("loading");
        load.parentNode.removeChild(load);

        database.once('value', function (snap) {
            localStorage.setItem("events", JSON.stringify(snap));
        })
    }
    else {
        database.once('value', function (snap) {
            localStorage.setItem("events", JSON.stringify(snap));
            console.log(JSON.stringify(snap));
            putdata(snap.val());
            box.appendChild(branches);



        }).then(function () {
            load = document.getElementById("loading");
            load.parentNode.removeChild(load);

        })
        ;
    }
}

function putdata(snap){
    Object.keys(snap).forEach(function (snapshot) {
        var div = document.createElement('a');
        console.log(snapshot);
        div.setAttribute("class", "col-lg-4 ind-events col-xs-12 ");
        div.id = snapshot;
        div.setAttribute("href", "branch/?branch="+snapshot);

        if(snapshot === "co" || snapshot === "pre" || snapshot === "ws"){
            tp.appendChild(div)
        }
        else { //edit this for full events
            number += 1;
            branches.appendChild(div);
            if (number === 3) {
                number = 0;
                box.appendChild(branches);
                branches = document.createElement("div");
                branches.setAttribute("class", "row sec-container");

            }
        }
        var im = document.createElement('img');
        im.setAttribute("href", "/branch/?branch="+snapshot);
        img = localStorage.getItem(snapshot);
        console.log(img);
        if(img){
            im.src = img;
        }
        else {
            storage.ref('events/' + snapshot + "/branch.svg").getDownloadURL().then(function (url) {
                // `url` is the download URL for 'images/stars.jpg'
                // This can be downloaded directly:
                // Or inserted into an <img> element:
                console.log("hello");
                im.src = url;
                localStorage.setItem(snapshot, url);
            }).catch(function (error) {
                console.log(error)
                // Handle any errors
            });
        }
        div.appendChild(im)
    });

}

