// Rover Object Goes Here
// ======================

// ======================



var rover =new Object();
rover.direction='N';
rover.coor = [5,5];
function turnLeft(rover){
  turn(1);
  console.log("turnLeft was called!");
}

function turnRight(rover){
  turn(-1);
  console.log("turnRight was called!");
}

function moveForward(rover){
  avanzar(1);
  console.log("moveForward was called")
}
function moveBackward(rover){
  avanzar(-1);
  console.log("moveForward was called")
}
function turn(a){
var direcciones =['N','E','S','W'];
var anterior = direcciones.indexOf(rover.direction);
var actual=direcciones.indexOf(rover.direction)+a;
if (actual<0){
  actual=3;
}else{
  actual=actual%4;
}
girar(direcciones[actual],direcciones[anterior],a);
rover.direction=direcciones[actual];
}
function avanzar(a){
  var error;
  switch(rover.direction){
    case 'N':
        if(rover.coor[0]-a<0||rover.coor[0]-a>9){
          error=true;
        }else{
          console.log(rover.coor[0]);
          console.log(a);
          console.log(rover.coor[0]-a);
          rover.coor[0]=rover.coor[0]-a
        }
       break;
    case 'S':
      if(rover.coor[0]+a>9||rover.coor[0]+a<0){
        error=true;
      }else{
        rover.coor[0]=rover.coor[0]+a;
      }
       break;
    case 'E':
      if(rover.coor[1]-a<0||rover.coor[1]-a>9){
        error=true;
      }else{
        rover.coor[1]=rover.coor[1]-a;
      }
       break;
    case 'W':
      if(rover.coor[1]+a>9||rover.coor[1]+a<0){
        error=true;
      }else{
        rover.coor[1]=rover.coor[1]+a;
      }
       break;
  }
  if(error){
    alert("CUIDADO QUE TE SALES¡¡¡");
  }else{
    document.getElementsByClassName("actual")[0].classList.remove(rover.direction.toLowerCase());
    document.getElementsByClassName("actual")[0].innerHTML = "";
    document.getElementsByClassName("actual")[0].classList.remove("actual");
    pintar();
  }
}
function pintar(){
  var posicion = parseInt(rover.coor[0]+""+rover.coor[1]);
  document.getElementById(posicion).setAttribute("class","tabla actual "+rover.direction.toLowerCase());
  document.getElementById(posicion).innerHTML = ">";
}
function girar(posicion1,posicion2,direccion){
  document.getElementsByClassName(posicion2.toLowerCase())[0].classList.add(posicion1.toLowerCase());
  document.getElementsByClassName(posicion2.toLowerCase())[0].classList.remove(posicion2.toLowerCase());
}
function table(){
var contenido="";
for (i=0;i<100;i++){
  contenido +='<div class="tabla" id="'+i+'"></div>';
}
document.getElementById("tabla").innerHTML=contenido;
document.getElementById("ordenes").onchange=lanzarOrdenes;
document.getElementsByTagName("button")[0].onclick=start;

pintar();
}
function lanzarOrdenes(){
  var ordenes = document.getElementById("ordenes").value;
  console.log(ordenes);
  for(var i=0;i<ordenes.length;i++){
    switch(ordenes[i]){
      case "r":
      setTimeout(function(){turnRight();},500*i);
        break;
      case "l":
      setTimeout(function(){turnLeft();},500*i);
        break;
      case "f":
      setTimeout(function(){moveForward();},500*i);
        break;
      case "b":
      setTimeout(function(){moveBackward();},500*i);
        break;
      default:
        console.log("Error: Orden incorrecta");
    }
  }
  document.getElementById("ordenes").value="";
}
function start(){
  document.getElementsByTagName("button")[0].classList.add("oculto");
  document.getElementById("shadow").classList.remove("oculto");
  document.getElementsByTagName("audio")[0].play();
}
window.onload=table;