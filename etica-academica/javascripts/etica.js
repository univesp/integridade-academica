$(document).ready(function () {

//desafio
// $(".checkbox-container").click(function(){
//   console.log("clicou")

// })

$(".checkbox-container input").change(function() {  
  let checkmark = $(this).siblings(".checkmark")
  let alternativa = $(this).parent();
  let gabarito = alternativa.data('resposta');
  checkmark.addClass("check-pulse")
  setTimeout(function(){
    if(gabarito==="correta"){    
      feedbackAcerto(alternativa)
    } else (
      feedbackErro(alternativa)
    )
  }, 900)  
  alternativa.parent().find("input").prop("disabled",true);
  alternativa.siblings().addClass("travado");
});

function feedbackAcerto(alternativa) {
  var este = alternativa;  
  este.find(".icone-feedback").addClass("feedback-acerto animated tada")
  setTimeout(function(){
    este.find(".feedback").addClass("highlight")    
  }, 900)
  setTimeout(function(){
    este.find(".feedback").addClass("highlight--highlighted")    
  }, 1000)
}
function feedbackErro(alternativa) {
  var este = alternativa;
  este.find(".icone-feedback").addClass("feedback-erro animated flash")  
  setTimeout(function(){    
    este.find(".feedback").addClass("linethrough")    
  }, 900)
  setTimeout(function(){    
    este.find(".feedback").addClass("linethrough--stroked")    
  }, 1000)
  setTimeout(function(){
    alternativa.siblings("[data-resposta='correta']").find(".feedback").addClass("highlight")
  }, 900)
  setTimeout(function(){
    alternativa.siblings("[data-resposta='correta']").find(".feedback").addClass("highlight--highlighted")
  }, 1000)
}

$(".pronto").click(function(){
  $(".proximos-passos").collapse('hide');
  $("#if-pronto").css('display', 'block');
  $("#desafio").collapse('show');
})
$(".aprender").click(function(){
  // $(".pronto-ou-aprender").collapse('hide');
  $(".proximos-passos").collapse('hide');
  // $("#if-aprender").css('display', 'block');
  $("#aprender").collapse('show');
  $("#desafio").collapse('show');
  // setTimeout(function(){
  //   const elemento = $("#aprender")
  //   colocaNaTela(elemento)
  // }, 500)
})

$("#if-pronto").click(function(){  
  $("#aprender").collapse('show');
  setTimeout(function(){
    $("#if-pronto").hide();
  }, 500)
})

// Detecta se o início da div está visível
// function colocaNaTela(elemento){  
//   var topoTela = $(window).scrollTop();
//   var topoElemento = elemento.offset().top;
//   console.log(topoTela);
//   console.log(topoElemento);
//   if (topoElemento < topoTela) {
//     $('html, body').animate({
//       scrollTop: topoElemento
//     });
//   }
// }




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

  $(".btn-licenca").click(function(){
    $(this).blur();
  })

})