

previd = "navhome";
prevpage = "#intro";
function makeactive(id,page) {

    if (page == "#partners"){
        $(".topnav").css('display', 'none');
        }
    else{
        $(".topnav").css('display', 'block');
    }

    var NAME = document.getElementById(previd);
    NAME.className=" ";
    var NAME = document.getElementById(id);
    NAME.className="active";

    previd = id;
    $(prevpage).css('z-index', '-2');
    $(prevpage).animate({
        opacity:0

    },500,function () {
        $(page).css('z-index', '2');
        $(page).animate({
            opacity:1

        },500);
    });


    prevpage = page;



}