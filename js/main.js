var i = 1;
var mouseover = false;
function mouseIN(){
    mouseover = true;
}
function mouseOut(){
    mouseover =false;
}
window.onload=function(){
    
    counter();
    
setInterval(function(){
  
    var str = window.location.href;
    var adr = "./images/"
    if (str.includes("german") || (str.includes("farsi")) || (str.includes("arabi"))){adr = "../images/"}
    if(!mouseover){i++};
    if ( i == 25){i = 1;}
   document.getElementById("slideImage").src=adr+i+".jpg";} ,3000);

}

function plusDivs(j){
    var str = window.location.href;
    var adr = "./images/"
    if (str.includes("german") || (str.includes("farsi")) || (str.includes("arabi"))){adr = "../images/"}
   i = i +j;
    if ( i == 25){i = 1;}
   document.getElementById("slideImage").src=adr+i+".jpg";
}

window.onresize=function(){
    var w = window.outerWidth;
    
    if(w>800) { document.getElementById("menuBar").style = "display: block;";
    document.getElementById("baner2").style = "marging-top:20px";
}
    else{document.getElementById("menuBar").style = "display: none;";
    document.getElementById("baner2").style = "marging-top:200px";}
}

function showMenu(){
    let chk = document.getElementById("menuBar").getAttribute("style");
    
    if(chk == "display: block;"){
    document.getElementById("menuBar").style = "display: none;";
    document.getElementById("baner2").style= "margin-top: 20px;";
}
else{
    document.getElementById("menuBar").style = "display: block;";
    document.getElementById("baner2").style= "margin-top: 200px;";
}
}

function counter(){
var d1= new Date(2018,10,10,10,0,0,0);

var d2= new Date();
var x = d1.getTime()-d2.getTime();
var second = 1000;
var minute = 60 * 1000;
var hour = minute *60;
var day = 24 * hour;
var dayRemain = Math.floor(x/day);
var y = x - dayRemain * day;
var hourRemain = Math.floor(y/hour);
var z = y - hourRemain * hour;
var minuteRemain = Math.floor(z/minute);
var w = z - minuteRemain* minute;
var secondRemain = Math.floor(w/second);


document.getElementById("bigday").innerText= dayRemain ;
document.getElementById("bighour").innerText= hourRemain ;
document.getElementById("bigmin").innerText= minuteRemain ;
document.getElementById("bigsec").innerText= secondRemain ;


setTimeout(counter,1000);

}
function myReadMore(){
    document.getElementById("showMe").style="display:inline;";
    document.getElementById("hideMe").style="display:none;";
   

}
function myReadLess(){
    document.getElementById("showMe").style="display:none;";
    document.getElementById("hideMe").style="display:block;";
    document.getElementById("Explain").style="border:none;";
    document.getElementById("Explain").style=" box-shadow: 0px;";

}
function killMe(){
    document.getElementById("close").style="display:none;";
    document.getElementById("open").style="display:block;";
}