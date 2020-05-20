import { ui } from './ui';
import { request } from './covidita';
import { openTab, getParameterByName } from './helpers';
import { CountDownTimer } from './countdown-timer';

export const run = () => {
  console.log('Covid-19 Ita');

  if(window.location.pathname === '/'){
    request.fetchAll()
    .then(data => {
      
      // console.log(data.andamento_nazionale);
      // console.log(data.andamento_regionale);
      // console.log(data.andamento_provinciale);
      
      ui.showHeader(data.andamento_nazionale);
      ui.showNationalData(data.andamento_nazionale);
      ui.showAndamentoNazionale(data.andamento_nazionale);

      ui.showAndamentoRegionale(data.andamento_regionale);

      ui.makeTabellaProvince(data.andamento_provinciale);

      new CountDownTimer();
    })

    // request.fetchAndamentoNazionale()
    //   .then(data => {
    //     ui.showHeader(data);
    //     ui.showNationalData(data);
    //     ui.showAndamentoNazionale(data);
    //     new CountDownTimer();
    //   });

    // request.fetchAndamentoRegionale()
    //   .then(data => {
    //     ui.showRegioniPiuColpite(data);
    //     ui.makeTabellaRegioni(data);
    //   });

    // request.fetchAndamentoProvinciale()
    //   .then(data => {
    //     ui.makeTabellaProvince(data);
    //   });


    const tabs = document.querySelectorAll('.tabs__links');

    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        openTab(e, tab.getAttribute('data-tab'));
      });
    });


  } else if(window.location.pathname === '/dettaglio-regione.html'){

    let parametro = getParameterByName('r');
    console.log(parametro);
    request.fetchAndamentoRegionale()
    .then(data => {
      let regione = [];
      data.forEach((dato, i) => {
        if(dato.denominazione_regione === parametro){
          regione.push(dato);
        }
      });
      ui.showDettaglioRegione(regione);
      new CountDownTimer();
    });

  }
  document.querySelector('.spinner').style.display = 'none';

}
