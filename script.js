var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var draw = false;
if(innerHeight > 992){
    canvas.width = 250;
    canvas.height = 400;
}else{
    canvas.width = innerWidth - 30;
    canvas.height = innerHeight - 100;
}
canvas.style.top = "calc(100% - " + canvas.height + ");"
function text(id){
    if(document.getElementById(id).value == ""){
        return document.getElementById(id).placeholder;
    }else{
        return document.getElementById(id).value;  
    }
}
var jdraw = false;
function mousedown(e){
    if(e.key == " "){
    draw = !draw;
    jdraw = true;
    console.log(draw);
    }
}
var mouse = {
    bx: null,
    by: null,
    nx: null,
    ny: null
}
canvas.addEventListener("mousemove",mousemove)
canvas.addEventListener("touchmove",mousemove)

function mousemove(e){
    if(mouse.ny != null || mouse.nx != null){
        mouse.bx = mouse.nx;
        mouse.by = mouse.ny;
    }
    var rect = canvas.getBoundingClientRect()
    mouse.nx = e.clientX - rect.left;
    mouse.ny = e.clientY - rect.top;
    if(jdraw){
        jdraw = false;
    }else if(draw){
        ctx.lineWidth = text("penwidth");
        ctx.strokeStyle="rgba("+text("r")+","+text("g")+","+text("b")+","+text("a")/100+")"
        ctx.beginPath();
        ctx.moveTo(mouse.bx,mouse.by);
        ctx.lineTo(mouse.nx,mouse.ny);
        ctx.stroke();
    }
}
document.addEventListener("keypress",key)
function key(e){
    mousedown(e);
    if(e.key == "c"){
        ctx.lineWidth = text("penwidth");
        ctx.strokeStyle="rgba("+text("r")+","+text("g")+","+text("b")+","+text("a")/100+")"
        ctx.beginPath();
        ctx.arc(mouse.nx,mouse.ny,text("radius"),0,Math.PI * 2);
        ctx.stroke();
    }
    if(e.key == "r"){
        var s = 40
        ctx.strokeRect(mouse.nx - s/2,mouse.ny - s/2,s,s);
    }
}
function download(){
    var link = document.createElement("a");
    link.download = "download.png";
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
}