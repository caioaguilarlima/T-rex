var notas = [10, 5, 8, 7, 10, 5];

function preload(){
    var soma = 0;
  
    for (var i = 0; i < notas.length; i++) {
      soma = soma + notas[i];
    }
  
    var media = soma / notas.length;
  
    console.log(media);
  }