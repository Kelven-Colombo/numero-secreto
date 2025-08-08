// Definindo o range do jogo:
const min = 1;
const max = 50;
// -----------------------------------------------------------------------------

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela("h1", "Jogo do Número Secreto");
    exibirTextoNaTela("p", `Escolha um número entre ${min} e ${max}`);

}

// ------------------------------------------------------------
exibirMensagemInicial();
// ------------------------------------------------------------

function limpaCampo(){
    document.querySelector('input').value = "";
}


// ------------------------------------------------------------
let listaDeNumerosSorteados = [];
// ------------------------------------------------------------

function gerarNumeroAleatorio(min, max){
    let numAleatorio = Math.floor(Math.random() * (max - min + 1) + min);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    let numeroLimite = (max - min + 1);

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    
    if (listaDeNumerosSorteados.includes(numAleatorio)){
        return gerarNumeroAleatorio(min,max);
    }else{
        listaDeNumerosSorteados.push(numAleatorio);
        console.log(`Numero sorteado: ${numAleatorio}`);
        console.log(`Lista atual: [${listaDeNumerosSorteados}]`);
        return numAleatorio;
    }

}

// ---------------------------------------------------
let numeroAleatorio = gerarNumeroAleatorio(min,max);
// ---------------------------------------------------

// ---------------------------------------------------
let tentativas = 1;
// ---------------------------------------------------

function verificarChute(){
    
    let chute = document.querySelector('input').value;
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    
    if (numeroAleatorio == chute){
        exibirTextoNaTela('h1',`Acertou!`);
        exibirTextoNaTela("p", `Você descobriu o numero secreto: ${numeroAleatorio} com ${tentativas} ${palavraTentativa}`);
        document.getElementById("reiniciar").removeAttribute("disabled");
    }else{
        if (numeroAleatorio > chute){
            exibirTextoNaTela('h1',`Errou`);
            exibirTextoNaTela("p", `O numero secreto é maior`);
        }else{
            exibirTextoNaTela('h1',`Errou`);
            exibirTextoNaTela("p", `O numero secreto é menor`);
        }
        tentativas++;
        limpaCampo();
    }
}

function reiniciarJogo(){
    limpaCampo();
    exibirMensagemInicial();
    numeroAleatorio = gerarNumeroAleatorio(min,max);
    tentativas = 1;
    document.getElementById("reiniciar").setAttribute("disabled",true);
}
