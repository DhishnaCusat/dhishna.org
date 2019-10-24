
$(document).ready(function()
{
    document.getElementById("my_audio").play();

const vw = (coef) =>  window.innerWidth * (coef/100);
 const vh = (coef) => window.innerHeight * (coef/100);

    var objects=[".size-d",".size-h",".size-i",".size-s",".size-h2",".size-n",".size-a"];
    var year=[".num-2",".num-0",".num-1",".num-8"];

    TweenMax.to($(".about-letters-a"), 1, {x:vw(10)});


    TweenMax.to($(".orange-piece"), 1, {x:vw(10)});
 TweenMax.to($(".piece-1"),1,{width:vw(19)});
    TweenMax.staggerFromTo($(objects), .5, {y:vw(0),ease: Power4.ease} ,{y:vw(-8),ease: Power4.ease,onComplete:myFunction},.3);
    function myFunction (){

    TweenMax.to($(".coverup"), 5, {width:vw(-10)});
}

    TweenMax.staggerFromTo($(year), .5, {y:vw(0),ease: Power4.ease} ,{y:vw(12),ease: Power4.ease},.3);


    TweenMax.to($(".sun"), 5, {width:vw(6),x:vw(46.5)});
    TweenMax.to($(".logo"), 2, {delay:2,x:vw(1),ease:Elastic.easeOut});




});
