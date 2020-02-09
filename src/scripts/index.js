// import { qs, qsa, $on, $delegate } from './utils';

import '../stylesheets/style.scss';
import $ from 'jquery';

$(document).ready(function() {
  $(function() {
    console.log('jQuery loaded ...');
  });
});

let currentStep = 0;

history.pushState({ page: 'step' }, 'Step_' + currentStep, 'creeprof_funnel_ajax.cfm');

/* Browser button back on Android */
$(window).on('popstate', function(event) {
  if (currentStep > 0) {
    showStep(currentStep - 1);
  }
});

const validations = [
  { name: 'etatCivil' },
  { name: 'corpulence' },
  {},
  { name: 'enfant' },
  { name: 'etude' },
  { name: 'nationalite' },
  { name: 'fumeur' },
  {},
  {},
  {},
];

function prevStep() {
  showStep(currentStep - 1);
}

function showStep(n) {
  history.pushState({ page: 'step' }, 'Step_' + currentStep, 'creeprof_funnel_ajax.cfm');

  if (n == undefined) {
    n = currentStep + 1;
  } else if (n == -1) {
    n = currentStep - 1;
  }

  if (n >= 0) {
    $('#divStep_' + currentStep).fadeOut(500);
    $('#divStep_' + n)
      .delay(500)
      .fadeIn(500);
  }

  if (n == 0 || n == 11) {
    $('.back-btn').fadeOut();
    $('.nav__bottom').fadeOut();
    $('.timeline').fadeOut();
  } else {
    $('.back-btn').fadeIn();
    $('.nav__bottom').fadeIn();
    $('.timeline').fadeIn();
  }

  $('.timeline li').removeClass('active');
  $(`.timeline li:nth-child(${n})`).addClass('active');
  currentStep = n;
}

const validate = () => {
  var step = currentStep;
  var param = validations[Number(step) - 1];
  var r = false;
  switch (step) {
    /* Radio */
    case 1:
    case 2:
    case 4:
    case 5:
    case 7:
      if (validateRadio(param.name)) {
        r = true;
      }
      break;

    /* taille poids */
    case 3:
      var poids = $('input[name=poids]').val();
      var taille = $('input[name=taille]').val();

      if (taille >= 60 && taille <= 240) {
        r = true;
        if (poids.length > 0) {
          if (poids >= 40 && poids <= 300) {
            console.log('do nothing');
          } else {
            r = false;
          }
        }
      }
      break;

    /* Nationalite */
    case 6:
      if ($("select[name='nationalite']").val() > 1) {
        r = true;
      }
      break;

    /* agemin agemax */
    case 8:
      var agemin = $('input[name=agemin]').val();
      var agemax = $('input[name=agemax]').val();

      if (agemax >= 20 && agemax <= 99 && agemin >= 18 && agemin <= 90) {
        r = true;
      }
      break;

    /* commentaire caractere */
    case 9:
      r = true;
      var caractere = $("select[name='caractere']").val();
      var commentaire = $("textarea[name='commentaire']").val();

      if (caractere == 0) {
        r = false;
      }
      if (commentaire.length < 50) {
        r = false;
      }
      break;

    /* vacances parfum */
    case 10:
      r = true;
      break;
  }

  if (r) {
    $('#divStep_' + currentStep + ' .errorMessage').slideUp();
    showStep();
  } else {
    $('#divStep_' + currentStep + ' .errorMessage').slideDown();
  }
};

var validateRadio = function(el) {
  var n = $("input[name='" + el + "']:checked").val();

  if (n) {
    return true;
  } else {
    return false;
  }
};

var validateSelect = function(el) {
  var n = $("select[name='" + el + "']").val();

  if (n) {
    return true;
  } else {
    return false;
  }
};

window.showStep = showStep;
window.prevStep = prevStep;
window.validate = validate;
window.currentStep = currentStep;
