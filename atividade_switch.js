
// Variável global
var tamanho_copo;

function setup() {

  tamanho_copo = 250;

  switch (tamanho_copo) {
    case 100:
      fecharCafeteira(5);
      break; // interrompe a execução e sai do switch
    case 200:
      fecharCafeteira(10);
      break;
    case 300:
      fecharCafeteira(15);
      break;
    default: // toda condição que não se encaixa nas anteriores
      fecharCafeteira(2);
      break;
  }
}

function fecharCafeteira(tempo)
{
  console.log('Tempo para desligar: ' + tempo + ' segundos');
}