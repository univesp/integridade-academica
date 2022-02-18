$(document).ready(function () {

  // Animações
  const lottie1 = bodymovin.loadAnimation({
    container: document.getElementById('anima-1'),
    path: 'assets/anima-integral.json',
    autoplay: true,
    renderer: 'svg',
    loop: true,
    autoplay: true
  })
  const lottie2 = bodymovin.loadAnimation({
    container: document.getElementById('anima-2'),
    path: 'assets/anima-parcial.json',
    autoplay: true,
    renderer: 'svg',
    loop: true,
    autoplay: true
  })
  const lottie3 = bodymovin.loadAnimation({
    container: document.getElementById('anima-3'),
    path: 'assets/anima-conceitual.json',
    autoplay: true,
    renderer: 'svg',
    loop: true,
    autoplay: true
  })
  const lottie4 = bodymovin.loadAnimation({
    container: document.getElementById('anima-4'),
    path: 'assets/anima-auto.json',
    autoplay: true,
    renderer: 'svg',
    loop: true,
    autoplay: true
  })
  const lottie5 = bodymovin.loadAnimation({
    container: document.getElementById('anima-5'),
    path: 'assets/anima-retalhos.json',
    autoplay: true,
    renderer: 'svg',
    loop: true,
    autoplay: true
  })
    
  // TIPOS DE PLÁGIO
  
  $('.plagio').click(function () {
    var identifica_plagio = '';
    identifica_plagio = $(this).attr('id');
    // Altera estado dos botões
    $(".plagio").removeClass("botao--ativo");
    $("#" + identifica_plagio).addClass("botao--ativo");
    // Mostra quadro e animação correspondente
    $(".quadro_plagio").hide();
    $("#caixa" + identifica_plagio).show();
    $(".plagios_animacao").hide();
    $("#anima-" + identifica_plagio).show();
    let animacao = eval("lottie" + identifica_plagio);    
    animacao.goToAndPlay(0)
  })

  var identifica_questao = '';
  var soma = 1;

  // SERÁ QUE É PLÁGIO

  // Habilitar botão
  // $("#rbutton_"+i).prop("disabled",true);

  // Navegação das questões
  $('.botao_questao').click(function () {    
    identifica_questao = $(this).attr('id').replace(/\D/g, "");
    // console.log(identifica_questao);
    $('.ativo').removeClass('ativo');
    $(this).addClass('ativo');
    $('.questao--ativa').removeClass('questao--ativa');
    $("#questao-" + identifica_questao).addClass('questao--ativa').show();    
  })

  // Resposta das questões
  $(".sim_nao").click(function(){    
    // Estados dos botões
    $(this).addClass('selecionado').prop("disabled",true);
    $(this).siblings().prop("disabled",true);    
    // Captura resposta e gabarito
    let estaQuestao = $(this).parents(".questao_wrapper");
    let resposta = $(this).val();
    let gabarito = estaQuestao.data('plagio');
    // Insere carimbo
    let carimboConteudo;
    if (gabarito === "sim") {
      carimboConteudo = "<div>É plágio</div>"      
    } else {
      carimboConteudo = "<div>Não é plágio</div>"
    }
    estaQuestao.find('.carimbo').append(carimboConteudo)
    //Confere resposta
    if (resposta === gabarito) {
      console.log('acertou');
      estaQuestao.find('.quadro_resposta').removeClass('bloqueada');
      estaQuestao.find('.plagio_acerto').show();
      estaQuestao.find('.carimbo').addClass('animated pulse')
    } else {
      console.log('errrrooou');
      $(this).addClass('dash')
      estaQuestao.find('.quadro_resposta').removeClass('bloqueada');
      estaQuestao.find('.plagio_erro').show();
      estaQuestao.find('.carimbo').addClass('animated shake')
    }    
    setTimeout(function(){
      estaQuestao.find('.collapse').collapse();
      estaQuestao.find('.carimbo').removeClass('animated');
      // Detecta se o feedback está visível
      var feedback = estaQuestao.find('.quadro_resposta');      
      var baseTela = $(window).scrollTop() + $(window).height();
      var topoFeedback = feedback.offset().top
      var baseFeedback = topoFeedback + feedback.outerHeight()
      if (baseTela < baseFeedback){        
        $('html, body').animate({
          scrollTop: topoFeedback - $(window).height() + feedback.outerHeight() + 16
        });
      }
    }, 1000)

  })

  // Liberar próxima questão/avançar
  $('.botao_avancar').click(function(){
    let estaQuestao = $(this).parents('.questao_wrapper').attr('id').substr(length-1, 1);
    let proximaQuestao = parseInt(estaQuestao) + 1;    
    $('.ativo').removeClass('ativo');
    $('#q-' + proximaQuestao).addClass('ativo').prop("disabled",false);
    $('.questao--ativa').removeClass('questao--ativa');
    $("#questao-" + proximaQuestao).addClass('questao--ativa').show();
    // Detecta se o início do quiz está visível
    var topoTela = $(window).scrollTop();
    var topoQuiz = $(".quiz_container").offset().top;
    if (topoQuiz < topoTela) {
      $('html, body').animate({
        scrollTop: topoQuiz
      });
    }
  })



  // Aplica highlights quando o elemento estiver em 1/3 da tela
  $(window).on('resize scroll', function () {
    var tercoDaTela = $(window).scrollTop() + $(window).height() / 1.5;
    $(".highlight").each(function () {
      var elementTop = $(this).offset().top;
      if (elementTop < tercoDaTela) {
        $(this).addClass("highlight--highlighted")
      }
    })
  })  

})