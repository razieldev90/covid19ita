import { formatData, formatNumber, makeDatasets } from './helpers';

export class UI {
  constructor(){
    this.output = document.getElementById('output');
    this.outputNazionali = document.getElementById('outputNazionali');
    this.outputRegionali = document.getElementById('outputRegionali');
    this.outputProvinciali = document.getElementById('outputProvinciali');
    this.header = document.getElementById('header');
  }

  // clearOutput(){
  //   this.output.innerHTML = '';
  //   // this.outputNazionali.innerHTML = '';
  //   // this.outputRegionali.innerHTML = '';
  //   // this.outputProvinciali.innerHTML = '';
  // }

  showHeader(data){
    let ultimiDueGiorni = [...data].splice(data.length - 2, data.length);
    let dataIeri = ultimiDueGiorni[0];
    let dataOggi = ultimiDueGiorni[1];
    this.header.innerHTML = this.makeHeader(dataOggi, dataIeri); 
  }

  showNationalData(data){
    // this.clearOutput();
    // this.output.appendChild(this.formatDatiNazionali(data));
    this.outputNazionali.appendChild(this.formatDatiNazionali(data));
  }

  showAndamentoRegionale(data){
    this.makeTabellaRegioni(data);
    this.showRegioniPiuColpite(data);
  }

  formatOspedalizzati(data, dataOggi, dataIeri){
    let div = document.createElement('div');
    div.setAttribute('class', 'container text-center py-5 my-3');
    div.innerHTML = `<h2 class="my-5">Ricoverati e Isolamento Domiciliare</h2>
        <p></p>`;
    let str = `
      <div class="row">
        <div class="dato col col-md-4">
          <h3 class="dato__titolo">Ricoverati con Sintomi</h3>
          <p class="dato__numero">${formatNumber(dataOggi.ricoverati_con_sintomi)}</p>
          <p class="dato__variazione">${this.variazione(dataOggi.ricoverati_con_sintomi, dataIeri.ricoverati_con_sintomi, true)}</p>
        </div>
        <div class="dato col col-md-4">
          <h3 class="dato__titolo">Terapia Intensiva</h3>
          <p class="dato__numero">${formatNumber(dataOggi.terapia_intensiva)}</p>
          <p class="dato__variazione">${this.variazione(dataOggi.terapia_intensiva, dataIeri.terapia_intensiva, true)}</p>
        </div>
        <div class="dato col col-md-4">
          <h3 class="dato__titolo">Isolamento Domiciliare</h3>
          <p class="dato__numero">${formatNumber(dataOggi.isolamento_domiciliare)}</p>
          <p class="dato__variazione">${this.variazione(dataOggi.isolamento_domiciliare, dataIeri.isolamento_domiciliare, true)}</p>
        </div>        
      `;
    div.innerHTML += str;

    
    this.outputNazionali.appendChild(div);
  }

  showAndamentoNazionale(data){
    const datasets = makeDatasets(data);
    const dataOggi = data[data.length - 1];
    const dataIeri = data[data.length - 2];
    
    let chartTag = `
    <div class="container">
      <div class="row mt-5">
        <div class="col col-12 col-lg-6">
          <div class="text-center">
            <h3>Totale crescita coronavirus Italia</h3>
            <p>Questo grafico mostra la crescita totale del coronavirus in Italia</p><p>Attraverso la legenda è possibile includere/escludere le statistiche cliccando sull apposita statistica.</p>
          </div>
          <div class="grafico bg-dark">
            <canvas id="myChart" ></canvas>
          </div>
        </div>
        <div class="col col-12 col-lg-6">
          <div class="text-center">
            <h3>Crescita giornalieria coronavirus Italia</h3>
            <p>Questo grafico mostra la crescita giornaliera del coronavirus in Italia.</p><p>Attraverso la legenda è possibile includere/escludere le statistiche cliccando sull apposita statistica.</p>
          </div>
          <div class="grafico bg-dark">
            <canvas id="crescitagiorno" ></canvas>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col col-12 col-lg-6">
          <div class="text-center">
            <h3>Trend giornaliero tamponi</h3>
            <p>Nuovi casi giornalieri, numero complessivo di tamponi effettuati e rapporto %</p>
          </div>
          <div class="grafico bg-dark">
            <canvas id="trendTamponiContagi" ></canvas>
          </div>
        </div>
        <div class="col col-12 col-lg-6">
          <div class="text-center">
            <h3>Trend persone testate</h3>
            <p>Numero di persone testate giornaliero, casi positivi rilevati e rapporto %.</p>
          </div>
          <div class="grafico bg-dark">
            <canvas id="trendCasiPersone"></canvas>
          </div>
        </div>
      </div>
      </div>`;

    this.outputNazionali.innerHTML += chartTag;

    var ctx4 = document.getElementById('trendCasiPersone').getContext('2d');
    var myChart4 = new Chart(ctx4, {
      type: 'bar',
      data: {
        labels: [...datasets.date].splice(57, datasets.date.length),
        datasets: [
          {
            backgroundColor: "#f00",
            data: [...datasets.persone_testate_giornalieri].splice(57, datasets.persone_testate_giornalieri.length),
            lineTension: "0",
            label: "Persone Testate"
          },
          {
            backgroundColor: "#0f0",
            data: [...datasets.casi_giornalieri].splice(57, datasets.casi_giornalieri.length),
            lineTension: "0",
            label: "Casi"
          },
          {
            backgroundColor: "#00f",
            data: [...datasets.rapporto_casi_persone_giornaliero].splice(57, datasets.rapporto_casi_persone_giornaliero.length),
            label: "Rapporto %"
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
          }]
        },
      },
    });

    var ctx3 = document.getElementById('trendTamponiContagi').getContext('2d');
    var myChart3 = new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: datasets.date,
        datasets: [
          {
            backgroundColor: "#f77f00",
            data: datasets.tamponi_giornalieri,
            lineTension: "0",
            label: "Tamponi"
          },
          {
            backgroundColor: "#d62828",
            data: datasets.casi_giornalieri,
            lineTension: "0",
            label: "Casi"
          }
          ,
          {
            backgroundColor: "#d62828",
            data: datasets.rapporto_tamponi_casi_giornaliero,
            lineTension: "0",
            label: "Rapporto %"
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
          }]
        },
      },
    });
    var ctx2 = document.getElementById('crescitagiorno').getContext('2d');
    var myChart2 = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: datasets.date,
        datasets: [
          {
            backgroundColor: "#f77f00",
            data: datasets.casi_giornalieri,
            lineTension: "0",
            label: "Contagiati"
          },
          {
            backgroundColor: "#d62828",
            data: datasets.decessi_giornalieri,
            lineTension: "0",
            label: "Decessi"
          },
          {
            backgroundColor: "#327210",
            data: datasets.guariti_giornalieri,
            lineTension: "0",
            label: "Guariti"
          },
          {
            backgroundColor: "#327210",
            data: datasets.terapia_intensiva_giornalieri,
            lineTension: "0",
            label: "Terapia Intensiva"
          },
          // {
          //   backgroundColor: "#0ff",
          //   data: datasets.attualmente_positivi_giornalieri,
          //   lineTension: "0",
          //   label: "Attualmente positivi"
          // }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
          }]
        },
      },
    });
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx,{
      type: 'line',
      data: {
        labels: datasets.date,
        datasets: [
          {
            label: 'Casi Totali',
            data: datasets.casi,
            borderColor: 'rgba(186, 202, 40, 1)',
            backgroundColor: 'rgba(186, 202, 40, 1)',
          },
          {
            label: 'Attualmente Positivi',
            data: datasets.attualmente_positivi,
            borderColor: 'rgba(255, 166, 0, 1)',
            backgroundColor: 'rgba(255, 166, 0, 1)',
          },
          {
            label: 'Guariti',
            data: datasets.guariti,
            borderColor: 'rgba(0, 255, 0, 1)',
            backgroundColor: 'rgba(0, 255, 0, 1)',
          },
          {
            label: 'Decessi',
            data: datasets.decessi,
            borderColor: 'rgba(255, 0, 0, 1)',
            backgroundColor: 'rgba(255, 0, 0, 1)',
          },
          {
            label: 'Terapia Intensiva',
            data: datasets.terapia_intensiva,
            borderColor: 'rgba(255, 0, 255, 1)',
            backgroundColor: 'rgba(255, 0, 255, 1)',
            hidden: true
          },
          {
            label: 'Isolamento Domiciliare',
            data: datasets.isolamento_domiciliare,
            borderColor: 'rgba(127, 94, 255, 1)',
            backgroundColor: 'rgba(127, 94, 255, 1)',
            hidden: true
          },
        ]
      },
      options: {
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
          }]
        },
      },
    });

    this.formatOspedalizzati(data, dataOggi, dataIeri);
  }

  // showRegionalData(data){
  //   this.clearOutput();
  //   this.output.innerHTML = '<h2 class="text-center">Dati Regionali</h2>';
  //   data.forEach(regione => {
  //     // this.output.appendChild(this.formatRegione(regione));
  //     this.outputRegionali.appendChild(this.formatRegione(regione));
  //   });
  // }


  // showProvinciaData(data){
  //   this.clearOutput();
  //   // this.output.innerHTML = '<h2 class="text-center w-100">Dati Provinciali</h2>';
  //   data.forEach(dato => {
  //     dato.forEach(provincia => {
  //       // this.output.appendChild(this.formatProvincia(provincia));
  //       this.outputProvinciali.appendChild(this.formatProvincia(provincia));
  //     });
  //   });
  // }

  variazione(oggi, ieri, percentuale = false, inverted_class = false){
    let vari = formatNumber(oggi - ieri);
    let var_percentuale = (((oggi / ieri) * 100) - 100).toFixed(2);
    let vari_class;
    if (vari < 0){
      inverted_class ? vari_class = 'text-red' : vari_class = 'text-green';
    }else if (vari == 0) {
      vari_class = 'text-black';
    } else {
      vari = '+' + vari;
      var_percentuale = '+' + var_percentuale;
      inverted_class ? vari_class = 'text-green' : vari_class = 'text-red';
    }
    inverted_class === 'black' ? vari_class = 'text-black' : '';
    const stringa = percentuale ? `<span class="${vari_class}">${vari} (${var_percentuale}&percnt;)</span>` : `<span class="${vari_class}">${vari}</span>`
    return stringa;
  }

  makeTabellaRegioni(data){
    const tbody = document.getElementById('tbodyRegioni');
    let tr = '';
    let ultimiDueGiorni = [...data].splice(data.length - (21 * 2), (data.length - 21));
    let dataOggi = [...ultimiDueGiorni].splice(ultimiDueGiorni.length - 21, ultimiDueGiorni.length);
    let dataIeri = [...ultimiDueGiorni].splice(ultimiDueGiorni.length - 42, ultimiDueGiorni.length - 21);
    dataOggi.forEach((dato, i) => {
      tr += `<tr>
        <td data-label="Regione"><a class="table-link" href="/dettaglio-regione.html?r=${dato.denominazione_regione}" data-modal="${dato.denominazione_regione}">${dato.denominazione_regione}</a></td>
        <td data-label="Tamponi">${formatNumber(dato.tamponi)} (${this.variazione(dataOggi[i].tamponi, dataIeri[i].tamponi, null, 'black')})</td>
        <td data-label="Totale Casi">${formatNumber(dato.totale_casi)} (${this.variazione(dataOggi[i].totale_casi, dataIeri[i].totale_casi)})</td>
        <td data-label="Totale Positivi">${formatNumber(dato.totale_positivi)} (${this.variazione(dataOggi[i].totale_positivi, dataIeri[i].totale_positivi)})</td>
        <td data-label="Ospedalizzati">${formatNumber(dato.totale_ospedalizzati)} (${this.variazione(dataOggi[i].totale_ospedalizzati, dataIeri[i].totale_ospedalizzati)})</td>
        <td data-label="Terapia Intensiva">${formatNumber(dato.terapia_intensiva)} (${this.variazione(dataOggi[i].terapia_intensiva, dataIeri[i].terapia_intensiva)})</td>
        <td data-label="Isolamento Domiciliare">${formatNumber(dato.isolamento_domiciliare)} (${this.variazione(dataOggi[i].isolamento_domiciliare, dataIeri[i].isolamento_domiciliare)})</td>
        <td data-label="Decessi">${formatNumber(dato.deceduti)} (${this.variazione(dataOggi[i].deceduti, dataIeri[i].deceduti)})</td>
        <td data-label="Guarigioni">${formatNumber(dato.dimessi_guariti)} (${this.variazione(dataOggi[i].dimessi_guariti, dataIeri[i].dimessi_guariti, false, true)})</td>
      </tr>
      `;
    });
    tbody.innerHTML = tr;
  }

  showRegioniPiuColpite(data){

    let ultimiDueGiorni = [...data].splice(data.length - (21 * 2), (data.length - 21));
    let regioniOggi = [...ultimiDueGiorni].splice(ultimiDueGiorni.length - 21, ultimiDueGiorni.length);
    let regioniIeri = [...ultimiDueGiorni].splice(ultimiDueGiorni.length - 42, ultimiDueGiorni.length - 21);
    // const topRegioni = [...data].sort((a, b) => b.totale_casi - a.totale_casi).slice(0,5);
    const topRegioniOggi = regioniOggi.sort((a, b) => b.totale_casi - a.totale_casi).slice(0,5);
    const topRegioniIeri = regioniIeri.sort((a, b) => b.totale_casi - a.totale_casi).slice(0,5);

    
    let str= '';
    let ctx;
    for(let i = 0; i < 5; i++){
      str += `
        <div class="dato col col-md-6 col-xl-2 p-3">
          <h2 class="dato__nome">${topRegioniOggi[i].denominazione_regione}</h2>
          <p class="dato__numero">${formatNumber(topRegioniOggi[i].totale_casi)}</p>
          <p class="dato__variazione">${this.variazione(topRegioniOggi[i].totale_casi, topRegioniIeri[i].totale_casi, true)}</p>
          <div class="grafico grafico--top5 bg-dark">
            <canvas class="grafico grafico--fluid" id="graficoRegione-${topRegioniOggi[i].denominazione_regione}"></canvas>
          </div>
        </div>
      `;
    }

    const div = document.getElementById('Regionali');
    const row = document.createElement('div');
    row.setAttribute('class', 'row text-center p-3');
    row.innerHTML = '<div class="col col-12"><h2>Le 5 regioni con più contagi</h2></div>';
    row.innerHTML += str;
    div.prepend(row);

    for(let i = 0; i < 5; i++){
      const datasets= makeDatasets(data.filter(a => a.denominazione_regione === topRegioniOggi[i].denominazione_regione));
      ctx = document.getElementById(`graficoRegione-${topRegioniOggi[i].denominazione_regione}`).getContext('2d');
      let chart = new Chart(ctx,{
        type: 'line',
        data: {
          labels: datasets.date,
          datasets: [
            {
              label: 'Casi Totali',
              data: datasets.casi,
              borderColor: 'rgba(186, 202, 40, 1)',
              backgroundColor: 'rgba(186, 202, 40, 1)',
            },
            {
              label: 'Positivi',
              data: datasets.attualmente_positivi,
              borderColor: 'rgba(150, 12, 40, 1)',
              backgroundColor: 'rgba(150, 12, 40, 1)',
            },
            {
              label: 'Guariti',
              data: datasets.guariti,
              borderColor: 'rgba(0, 202, 40, 1)',
              backgroundColor: 'rgba(0, 202, 40, 1)',
            },
            {
              label: 'Decessi',
              data: datasets.decessi,
              borderColor: 'rgba(90, 154, 240, 1)',
              backgroundColor: 'rgba(90, 154, 240, 1)',
            },
          ]
        },
        options: {
          scales: {
            xAxes: [{
              gridLines: {
                display: false
              },
            }],
            yAxes: [{
              ticks: {
                stepSize: 10000,
                // max: 100000,
              }
            }]
          },
        },
      });
    }
  }

  makeTabellaProvince(data){
    const tbody = document.getElementById('tbodyProvince');
    let tr = '';
    let ultimiDueGiorni = [...data].splice(data.length - (128 *2), data.length);
    let dataOggi = [...ultimiDueGiorni].splice(ultimiDueGiorni.length - 128, ultimiDueGiorni.length);
    let dataIeri = [...ultimiDueGiorni].splice(ultimiDueGiorni.length - 256, dataOggi.length);

    dataOggi.forEach((dato, i) => {
      tr += `<tr>
        <td data-label="Provincia"><a class="table-link" href="#" data-modal="${dato.denominazione_provincia}">${dato.denominazione_provincia}</a></td>
        <td data-label="Totale Casi">${formatNumber(dato.totale_casi)} (${this.variazione(dataOggi[i].totale_casi, dataIeri[i].totale_casi)})</td>
      </tr>
      `;
    });
    tbody.innerHTML = tr;
  }


  formatDatiNazionali(datiNazionali){
    const dataOggi = datiNazionali[datiNazionali.length-1];
    const dataIeri = datiNazionali[datiNazionali.length-2];
    
    let str = '';
    let ul = document.createElement('ul')
    ul.classList.add('grigliaDettaglio', 'container', 'p-3');
    str += `
      <li class="titolo "><h2>Dati Nazionali</h2></li>
      <li class="tamponi"><strong class="tooltip" data-tooltip="Totale tamponi effettuati">Tamponi</strong><p>${formatNumber(dataOggi.tamponi)} ${this.variazione(dataOggi.tamponi, dataIeri.tamponi)}</p></li>
      <li class="testati"><strong class="tooltip" data-tooltip="Totale dei soggetti sottoposti al test">Casi Testati</strong><p>${formatNumber(dataOggi.casi_testati)} ${this.variazione(dataOggi.casi_testati, dataIeri.casi_testati)}</p></li>
      <li class="totale-casi"><strong class="tooltip" data-tooltip="Totale casi positivi">Totale casi</strong><p>${formatNumber(dataOggi.totale_casi)} ${this.variazione(dataOggi.totale_casi, dataIeri.totale_casi)}</p></li>
      <li class="ricoverati-con-sintomi"><strong>Ricoverati con sintomi</strong><p>${formatNumber(dataOggi.ricoverati_con_sintomi)} ${this.variazione(dataOggi.ricoverati_con_sintomi, dataIeri.ricoverati_con_sintomi)}</p></li>
      <li class="totale-ospedalizzati"><strong>Totale ospedalizzati</strong><p>${formatNumber(dataOggi.totale_ospedalizzati)} ${this.variazione(dataOggi.totale_ospedalizzati, dataIeri.totale_ospedalizzati)}</p></li>
      <li class="totale-positivi"><strong class="tooltip" data-tooltip="Totale attualmente positivi (ospedalizzati + isolamento domiciliare)">Totale Positivi</strong><p>${formatNumber(dataOggi.totale_positivi)} ${this.variazione(dataOggi.totale_positivi, dataIeri.totale_positivi)}</p></li>
      <li class="nuovi-positivi"><strong class="tooltip" data-tooltip="Nuovi attualmente positivi (totale_casi giorno corrente - totale_casi giorno precedente)">Nuovi Positivi</strong><p>${formatNumber(dataOggi.nuovi_positivi)}</p></li>
      <li class="isolamento-domiciliare"><strong>Isolamento Domiciliare</strong><p>${formatNumber(dataOggi.isolamento_domiciliare)} ${this.variazione(dataOggi.isolamento_domiciliare, dataIeri.isolamento_domiciliare)}</p></li>
      <li class="terapia-intensiva"><strong>Terapia Intensiva</strong><p>${formatNumber(dataOggi.terapia_intensiva)} ${this.variazione(dataOggi.terapia_intensiva, dataIeri.terapia_intensiva)}</p></li>
      <li class="decessi"><strong>Decessi</strong><p>${formatNumber(dataOggi.deceduti)} ${this.variazione(dataOggi.deceduti, dataIeri.deceduti)}</p></li>
      <li class="dimessi-guariti"><strong>Dimessi Guariti</strong><p>${formatNumber(dataOggi.dimessi_guariti)} ${this.variazione(dataOggi.dimessi_guariti, dataIeri.dimessi_guariti, false, true)}</p></li>
      `;
    ul.innerHTML += str;
    return ul;
  }

  showDettaglioRegione(data){
    if(!data) {alert('Regione non specificata')};
    const nome_regione = data[0].denominazione_regione;
    const regioneDiv = document.getElementById('dettaglioRegione');
    const dataOggi = data[data.length - 1];
    const dataIeri = data[data.length - 2];
    
    this.header.innerHTML = this.makeHeader(dataOggi, dataIeri, true);
    let str = '';
    let ul = document.createElement('ul')
    ul.classList.add('grigliaDettaglio', 'container');
    str += `
      <li class="tamponi"><strong class="tooltip" data-tooltip="Totale tamponi effettuati">Tamponi</strong><p>${formatNumber(dataOggi.tamponi)} ${this.variazione(dataOggi.tamponi, dataIeri.tamponi)}</p></li>
      <li class="testati"><strong class="tooltip" data-tooltip="Totale dei soggetti sottoposti al test">Casi Testati</strong><p>${formatNumber(dataOggi.casi_testati)} ${this.variazione(dataOggi.casi_testati, dataIeri.casi_testati)}</p></li>
      <li class="totale-casi"><strong class="tooltip" data-tooltip="Totale casi positivi">Totale casi</strong><p>${formatNumber(dataOggi.totale_casi)} ${this.variazione(dataOggi.totale_casi, dataIeri.totale_casi)}</p></li>
      <li class="ricoverati-con-sintomi"><strong>Ricoverati con sintomi</strong><p>${formatNumber(dataOggi.ricoverati_con_sintomi)} ${this.variazione(dataOggi.ricoverati_con_sintomi, dataIeri.ricoverati_con_sintomi)}</p></li>
      <li class="totale-ospedalizzati"><strong>Totale ospedalizzati</strong><p>${formatNumber(dataOggi.totale_ospedalizzati)} ${this.variazione(dataOggi.totale_ospedalizzati, dataIeri.totale_ospedalizzati)}</p></li>
      <li class="totale-positivi"><strong class="tooltip" data-tooltip="Totale attualmente positivi (ospedalizzati + isolamento domiciliare)">Totale Positivi</strong><p>${formatNumber(dataOggi.totale_positivi)} ${this.variazione(dataOggi.totale_positivi, dataIeri.totale_positivi)}</p></li>
      <li class="nuovi-positivi"><strong class="tooltip" data-tooltip="Nuovi attualmente positivi (totale_casi giorno corrente - totale_casi giorno precedente)">Nuovi Positivi</strong><p>${formatNumber(dataOggi.nuovi_positivi)}</p></li>
      <li class="isolamento-domiciliare"><strong>Isolamento Domiciliare</strong><p>${formatNumber(dataOggi.isolamento_domiciliare)} ${this.variazione(dataOggi.isolamento_domiciliare, dataIeri.isolamento_domiciliare)}</p></li>
      <li class="terapia-intensiva"><strong>Terapia Intensiva</strong><p>${formatNumber(dataOggi.terapia_intensiva)} ${this.variazione(dataOggi.terapia_intensiva, dataIeri.terapia_intensiva)}</p></li>
      <li class="decessi"><strong>Decessi</strong><p>${formatNumber(dataOggi.deceduti)} ${this.variazione(dataOggi.deceduti, dataIeri.deceduti)}</p></li>
      <li class="dimessi-guariti"><strong>Dimessi Guariti</strong><p>${formatNumber(dataOggi.dimessi_guariti)} ${this.variazione(dataOggi.dimessi_guariti, dataIeri.dimessi_guariti, false, true)}</p></li>
      `;
      ul.innerHTML = str;
    regioneDiv.appendChild(ul);

    const datasets = makeDatasets(data);

    let chartTag = `
    <div class="container">
      <div class="row mt-5">
        <div class="col col-12 col-lg-6">
          <div class="text-center">
            <h3>Totale crescita coronavirus in ${nome_regione}</h3>
            <p>Questo grafico mostra la crescita totale del coronavirus nella regione</p><p>Attraverso la legenda è possibile includere/escludere le statistiche cliccando sull apposita statistica.</p>
          </div>
          <div class="grafico bg-dark">
            <canvas id="myChart" ></canvas>
          </div>
        </div>
        <div class="col col-12 col-lg-6">
          <div class="text-center">
            <h3>Crescita giornalieria coronavirus in ${nome_regione}</h3>
            <p>Questo grafico mostra la crescita giornaliera del coronavirus nella regione.</p><p>Attraverso la legenda è possibile includere/escludere le statistiche cliccando sull apposita statistica.</p>
          </div>
          <div class="grafico bg-dark">
            <canvas id="crescitagiorno" ></canvas>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        
        <div class="col col-12 col-lg-6">
          <div class="text-center">
            <h3>Trend persone testate</h3>
            <p>Numero di persone testate giornaliero, casi positivi rilevati e rapporto %.</p>
          </div>
          <div class="grafico bg-dark">
            <canvas id="trendCasiPersone"></canvas>
          </div>
        </div>
      </div>
      </div>`;

      regioneDiv.innerHTML += chartTag;

    var ctx4 = document.getElementById('trendCasiPersone').getContext('2d');
    var myChart4 = new Chart(ctx4, {
      type: 'bar',
      data: {
        labels: [...datasets.date].splice(57, datasets.date.length),
        datasets: [
          {
            backgroundColor: "#f00",
            data: [...datasets.persone_testate_giornalieri].splice(57, datasets.persone_testate_giornalieri.length),
            lineTension: "0",
            label: "Persone Testate"
          },
          {
            backgroundColor: "#0f0",
            data: [...datasets.casi_giornalieri].splice(57, datasets.casi_giornalieri.length),
            lineTension: "0",
            label: "Casi"
          },
          {
            backgroundColor: "#00f",
            data: [...datasets.rapporto_casi_persone_giornaliero].splice(57, datasets.rapporto_casi_persone_giornaliero.length),
            label: "Rapporto %"
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
          }]
        },
      },
    });

    
    var ctx2 = document.getElementById('crescitagiorno').getContext('2d');
    var myChart2 = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: datasets.date,
        datasets: [
          {
            backgroundColor: "#f77f00",
            data: datasets.casi_giornalieri,
            lineTension: "0",
            label: "Contagiati"
          },
          {
            backgroundColor: "#d62828",
            data: datasets.decessi_giornalieri,
            lineTension: "0",
            label: "Decessi"
          },
          {
            backgroundColor: "#327210",
            data: datasets.guariti_giornalieri,
            lineTension: "0",
            label: "Guariti"
          },
          {
            backgroundColor: "#327210",
            data: datasets.terapia_intensiva_giornalieri,
            lineTension: "0",
            label: "Terapia Intensiva"
          },
          // {
          //   backgroundColor: "#0ff",
          //   data: datasets.attualmente_positivi_giornalieri,
          //   lineTension: "0",
          //   label: "Attualmente positivi"
          // }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
          }]
        },
      },
    });
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx,{
      type: 'line',
      data: {
        labels: datasets.date,
        datasets: [
          {
            label: 'Casi Totali',
            data: datasets.casi,
            borderColor: 'rgba(186, 202, 40, 1)',
            backgroundColor: 'rgba(186, 202, 40, 1)',
          },
          {
            label: 'Attualmente Positivi',
            data: datasets.attualmente_positivi,
            borderColor: 'rgba(255, 166, 0, 1)',
            backgroundColor: 'rgba(255, 166, 0, 1)',
          },
          {
            label: 'Guariti',
            data: datasets.guariti,
            borderColor: 'rgba(0, 255, 0, 1)',
            backgroundColor: 'rgba(0, 255, 0, 1)',
          },
          {
            label: 'Decessi',
            data: datasets.decessi,
            borderColor: 'rgba(255, 0, 0, 1)',
            backgroundColor: 'rgba(255, 0, 0, 1)',
          },
          {
            label: 'Terapia Intensiva',
            data: datasets.terapia_intensiva,
            borderColor: 'rgba(255, 0, 255, 1)',
            backgroundColor: 'rgba(255, 0, 255, 1)',
            hidden: true
          },
          {
            label: 'Isolamento Domiciliare',
            data: datasets.isolamento_domiciliare,
            borderColor: 'rgba(127, 94, 255, 1)',
            backgroundColor: 'rgba(127, 94, 255, 1)',
            hidden: true
          },
        ]
      },
      options: {
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
          }],
          
        },
      },
    });

  }
  

  makeHeader(dataOggi, dataIeri, regione = false){
    let header_titolo = regione ? `<h1 class="header__titolo">Dati Regione ${dataOggi.denominazione_regione}</h1>` : '<h1 class="header__titolo">Dati Coronavirus in Italia</h1>';

    return `
      <div class="col col-12">
        ${header_titolo}
        <h3 class="header__sottotitolo">Aggiornamento del ${formatData(dataOggi.data)[0]}</h3>
        <h5 class="header__timer" id="timer"></h5>
      </div>
      <div class="dato col col-12 col-md-6 col-lg-3">
        <h3 class="dato__nome">Totale casi</h3>
        <h4 class="dato__numero">${formatNumber(dataOggi.totale_casi)}</h4>
        <p class="dato__variazione">${this.variazione(dataOggi.totale_casi, dataIeri.totale_casi, true)}</p>
      </div>
      <div class="dato col col-12 col-md-6 col-lg-3">
        <h3 class="dato__nome">Positivi</h3>
        <h4 class="dato__numero">${formatNumber(dataOggi.totale_positivi)}</h4>
        <p class="dato__variazione">${this.variazione(dataOggi.totale_positivi, dataIeri.totale_positivi, true)}</p>
      </div>
      <div class="dato col col-12 col-md-6 col-lg-3">
        <h3 class="dato__nome">Guariti</h3>
        <h4 class="dato__numero">${formatNumber(dataOggi.dimessi_guariti)}</h4>
        <p class="dato__variazione">${this.variazione(dataOggi.dimessi_guariti, dataIeri.dimessi_guariti, true, true)}</p>
      </div>
      <div class="dato col col-12 col-md-6 col-lg-3">
        <h3 class="dato__nome">Deceduti</h3>
        <h4 class="dato__numero">${formatNumber(dataOggi.deceduti)}</h4>
        <p class="dato__variazione">${this.variazione(dataOggi.deceduti, dataIeri.deceduti, true)}</p>
      </div>
    `;
  }
}

export const ui = new UI();