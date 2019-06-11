 (function () {
  var elem = document.getElementById("counter"); 
  var overlay = document.getElementById("overlay"); 
  var num = 1;
  var id = setInterval(frame, 50);
  function frame() {
    if (num >= 100) 
    { 
      overlay.style.transform = "translate(0px,-100vh)";
     elem.style.display = "none";
      clearInterval(id);

    }
    else
    {
      num++;
      elem.innerHTML = num + ' % ';

    }
  }
})();
