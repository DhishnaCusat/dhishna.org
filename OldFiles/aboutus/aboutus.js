
$(document).ready(function()
{
    document.getElementById("my_audio").play();


    const vw = (coef) =>  window.innerWidth * (coef/100);
    const vh = (coef) => window.innerHeight * (coef/100);
    TweenMax.to($(".hex-center"), 1.5, {opacity:1,scale: 2});
    TweenMax.to($(".bubble"), 3, {delay:1,opacity:1,scale:1.1,ease:Elastic.easeOut});
    TweenMax.to($(".about-letters"), 2, {delay:2,x:vw(2),ease:Elastic.easeOut});
    TweenMax.to($("#about-dhishna"), 2, {delay:2.6,opacity:1,ease:Elastic.easeIn});
    TweenMax.to($(".aboutus-sidepiece"), 2, {delay:2,y:vw(2),ease:Elastic.easeOut});










});
