//Scope chain 
function step1(){
    console.log(te);
}
function step2(){
     te =2;
    step1();
}
step2();
var te = "Global variables";