/*variaveis de controle de perguntas*/
let perguntasFeitas = [];

//PERGUNTAS DO JOGO
const perguntas = [
    //PERGUNTA 0
    {
        pergunta: "Qual dessas linguagens não é uma linguagem de programação",
        resposta: ["PHP", "JavaScript", "C++", "HTML"],
        correta: "resp3"
    },
    //PERGUNTA 1
    {
        pergunta: "Em que ano o Brasil foi descoberto",
        resposta: ["1498", "1500", "1375", "1828"],
        correta: "resp1"
    },
    //PERGUNTA 2
    {
        pergunta: "Em que ano o Brasil foi descoberto",
        resposta: ["1498", "1500", "1375", "1828"],
        correta: "resp1"
    },
    //PERGUNTA 3
    {
        pergunta: "O que significa a sigla HTML",
        resposta: ["Hiper Tonto Maluco Legal", "Hyper Text Markut Language", "Hey Trade More Lang", "Hyper Text Mark Lang"],
        correta: "resp1"
    },
    //PERGUNTA 4
    {
        pergunta: "Qual dessas linguagens é uma linguagem de Marcação",
        resposta: ["HTML", "JavaScript", "PHP", "C++"],
        correta: "resp0"
    }    
]


var qtdPerguntas = perguntas.length - 1;

gerarPerguntas(qtdPerguntas);

function gerarPerguntas(maxPerguntas) {
    //GERAR NUMERO ALEATORIO
    let aleatorio = (Math.random() * maxPerguntas).toFixed();
    //CONVERTER PARA NUMERO
    aleatorio = Number(aleatorio);

    //VERIFICAR DE A PERGUNTA SORTEADA JA FOI FEITA
    if(!perguntasFeitas.includes(aleatorio)){
        //COLOCAR COMO PERGUNTA FEITA
        perguntasFeitas.push(aleatorio);

        //PREENCHER O HTML COM OS DADOS DA QUESTÃO SELECIONADA
        var p_selecionada = perguntas[aleatorio].pergunta
        console.log(p_selecionada);

        //ALIMENTAR AS PERGUNAS VINDA DO SORTEIO
        $('#pergunta').html(p_selecionada);
        $('#pergunta').attr('data-indice', aleatorio)
        
        //ALIMENTAR AS RESPOSTAS;
        for(var i=0; i<4; i++) {
            $('#resp' + i).html(perguntas[aleatorio].resposta[i])
        }

        // var resp0 = perguntas[aleatorio].resposta[0];
        // var resp1 = perguntas[aleatorio].resposta[1];
        // var resp2 = perguntas[aleatorio].resposta[2];
        // var resp3 = perguntas[aleatorio].resposta[3];

        // $("#resp0").html(resp0);
        // $("#resp1").html(resp1);
        // $("#resp2").html(resp2);
        // $("#resp3").html(resp3);

        //EMBARALHAR AS RESPOSTAS
        var pai = $("#resposta");
        var botoes = pai.children();

        console.log(botoes)

        for(var i = 1; i < botoes.length; i++) {
            pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)))
        }
    }else{
        //SE A PERGUNTA JÁ FOI FEITA
        console.log('A pergunta já foi feita. Sortenado novamente')
        if(perguntasFeitas.length < qtdPerguntas + 1) {
            return gerarPerguntas(maxPerguntas)
        }else{
            console.log('Acabaram as perguntas')
            $('#quiz').addClass('oculto');
            $('#mensagem').html('Parabens! Você venceu, acertou todas as perguntas');
            $('#status').removeClass('oculto'); 
        }
    }

}

$('.resposta').click(function () {
    if($('#quiz').attr('data-status')!== 'travado') {
        //PERCORRER TODAS AS RESPOSTAS E DESMARCAR A CLASSE SELECIONADA
        resetaBotoes();

        //ADICIONAR A CLASSE SELECIONADA
        $(this).addClass('selecionada');
    }
})

$('#confirm').click(function () {
    //PEGAR O INDICE DA PERGUNTA
    var indice = $("#pergunta").attr('data-indice');

    //QUAL É A REPOSTA CERTA
    var respCerta = perguntas[indice].correta;

    //QUAL FOI A RESPOSTA QUE O USUARIO SELECIONOU
    $('.resposta').each(function() {
        if ($(this).hasClass('selecionada')) {
            var respostaEscolhida = $(this).attr('id');

            if(respCerta == respostaEscolhida) {
                console.log('Acertou!!!!!');
                proximaPergunta()
            }else {
                console.log('Errou!!!')
                $('#quiz').attr('data-status', 'travado')
                $('#confirm').addClass('oculto')
                $('#' + respCerta).addClass('correta')
                $('#' + respostaEscolhida).removeClass('selecionada')
                $('#' + respostaEscolhida).addClass('errada')
                setTimeout(function(){
                    gameOver();
                }, 4000);
            }
        }
    })
})

function newGame() {    
    $('#confirm').removeClass('oculto')
    $('#quiz').attr('data-status', 'ok')
    perguntasFeitas = [];
    resetaBotoes();
    gerarPerguntas(qtdPerguntas);    
    $('#quiz').removeClass('oculto');
    $('#status').addClass('oculto');
}

function proximaPergunta() {
    resetaBotoes();
    gerarPerguntas(qtdPerguntas);
}

function resetaBotoes() {
    //PERCORRER TODAS AS REPOSTAS E DESMARCAR A CLASSE SELECIONADA
    $('.resposta').each(function() {
        if($(this).hasClass('selecionada')) {
            $(this).removeClass('selecionada')
        }
        if($(this).hasClass('correta')) {
            $(this).removeClass('correta')
        }
        if($(this).hasClass('errada')) {
            $(this).removeClass('errada')
        } 
    });
}

function gameOver() {
    $('#quiz').addClass('oculto');
    $('#mensagem').html('Game Over')
    $('#status').removeClass('oculto');
}

$('#novoJogo').click(function() {
    newGame();
})
