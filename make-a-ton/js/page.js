
time = Date.now();
top1 = $(window).scrollTop();
$(document).ready(function(){


});

index = 1;

dic = {1: "makeactive('navhome', '#intro');",
    2:"makeactive('navprize', '#prizes');",
    3:"makeactive('navcont', '#contactUs');",
    4:"makeactive('navpartner', '#partners');"
    };

$(window).scroll(function(){
    if ((time+500-Date.now())<0) {

        if(top1 - $(window).scrollTop() < 0 && index < 4){
            top1 = $(window).scrollTop();
            if(index < 4){

                index += 1;
            }
            eval(dic[index]);
            console.log("increment")
        }
        else if(top1 - $(window).scrollTop() > 0 && index > 1 ){

            if(index > 1){
                index -= 1;
            }
            eval(dic[index]);
            console.log("decrement")
        }
        time = Date.now()

    }
    top1 = $(window).scrollTop();
});