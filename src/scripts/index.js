// import { qs, qsa, $on, $delegate } from './utils';

import '../stylesheets/style.scss';
import $ from './jquery';

$(document).ready(function() {
  $(function() {
    console.log('jQuery loaded ...');
  });
});

var currentStep = 0;

history.pushState({ page: 'step' }, 'Step_' + currentStep, 'creeprof_funnel_ajax.cfm');

/* Browser button back on Android */
$(window).on('popstate', function(event) {
  if (currentStep > 0) {
    showStep(currentStep - 1);
  }
});

const showStep = n => {
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
    $('#divBack').fadeOut();
  } else {
    $('#divBack').fadeIn();
  }

  currentStep = n;
};

const validate = (step, param) => {
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

      console.log(caractere, commentaire);
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
    $('#divError').fadeOut();
    showStep();
  } else {
    $('#divError').fadeIn();
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
window.validate = validate;
window.currentStep = currentStep;
