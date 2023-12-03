let menuBtn = document.getElementById("menuBtn")    
let sideNav = document.getElementById("sideNav")    
let menu = document.getElementById("menu") 

sideNav.style.right = "-350px";

menuBtn.onclick = function(){
    if(sideNav.style.right == "-350px"){
        sideNav.style.right = "0";
        menu.src = "images/close.png";
    }
    else{
        sideNav.style.right = "-350px";
        menu.src = "images/menu.png";
    }
}

// ========================  //
