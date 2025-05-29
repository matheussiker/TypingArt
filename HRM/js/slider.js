
let count = 1;

document.getElementById("radio1").checked = true;

setInterval(function () {
    nextimage();
}, 3000);


function nextimage() {
    count++; 
   
    if (count > 5) {
        count = 1;
    }
  
    document.getElementById("radio" + count).checked = true;
}


let novoCount = 1;

document.getElementById("novo-radio1").checked = true;


setInterval(function () {
    nextImageNovo();
}, 8000);


function nextImageNovo() {
    novoCount++; 
  
    if (novoCount > 5) {
        novoCount = 1;
    }
   
    document.getElementById("novo-radio" + novoCount).checked = true;
}