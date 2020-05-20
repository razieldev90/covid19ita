export function openTab(evt, tabTarget) {
  let tabcontent = document.querySelectorAll(".tabcontent");
  const tablinks = document.querySelectorAll(".tabs__links");
  tabcontent.forEach(tab => { tab.style.display = "none"; });
  tablinks.forEach(link => { link.classList.remove('active');});
  document.getElementById(tabTarget).style.display = "block";
  evt.currentTarget.classList.add('active');
}

export function dynamicsort(property,order) {
  var sort_order = 1;
  if(order === "desc"){ sort_order = -1; }
  return function (a, b){
    // a should come before b in the sorted order
    if(a[property] < b[property]){
      return -1 * sort_order;
    // a should come after b in the sorted order
    }else if(a[property] > b[property]){
      return 1 * sort_order;
    // a and b are the same
    }else{
      return 0 * sort_order;
    }
  }
}

export function formatNumber(number){
  return new Intl.NumberFormat('it-IT').format(number);
}

export function formatData(data){
  const d =  new Date(data);
  const month = ('0' + (d.getMonth()+1)).slice(-2);
  const day = ('0' + d.getDate()).slice(-2);
  const hour = ('0' + d.getHours()).slice(-2);
  const minutes = ('0' + d.getMinutes()).slice(-2);
  return [`${day}-${month}-${d.getFullYear()}`, `${hour}:${minutes}`];
  // return `${day}-${month}-${d.getFullYear()}`;
}

export function makeDatasets(data){
  let date = [];
  let guariti = [];
  let casi = [];
  let decessi = [];
  let attualmente_positivi = [];
  let terapia_intensiva = [];
  let isolamento_domiciliare = [];
  let tamponi = [];
  let persone_testate = [];
  let regioni = [];

  data.forEach(dato => {
    date.push(formatData(dato.data)[0]);
    decessi.push(dato.deceduti);
    casi.push((dato.totale_casi));
    guariti.push(dato.dimessi_guariti);
    attualmente_positivi.push(dato.totale_positivi);
    terapia_intensiva.push(dato.terapia_intensiva);
    isolamento_domiciliare.push(dato.isolamento_domiciliare);
    tamponi.push(dato.tamponi);
    persone_testate.push(dato.casi_testati);
  });

  let decessi_giornalieri = [];
  let guariti_giornalieri = [];
  let casi_giornalieri = [];
  let terapia_intensiva_giornalieri = [];
  let attualmente_positivi_giornalieri = [];
  let tamponi_giornalieri = [];
  let persone_testate_giornalieri = []
  let rapporto_tamponi_casi_giornaliero = []
  let rapporto_casi_persone_giornaliero = []


  for (let i = 0; i < date.length; i++){
    const decessi_oggi = decessi[i];
    const decessi_ieri = decessi[i - 1] || 0;
    decessi_giornalieri.push(decessi_oggi - decessi_ieri);

    const guariti_oggi = guariti[i];
    const guariti_ieri = guariti[i - 1] || 0;
    guariti_giornalieri.push(guariti_oggi - guariti_ieri);

    const casi_oggi = casi[i];
    const casi_ieri = casi[i - 1] || 0;
    casi_giornalieri.push(casi_oggi - casi_ieri);

    const persone_testate_oggi = persone_testate[i];
    const persone_testate_ieri = persone_testate[i - 1] || 0;
    persone_testate_giornalieri.push(persone_testate_oggi - persone_testate_ieri);

    const terapia_intensiva_oggi = terapia_intensiva[i];
    const terapia_intensiva_ieri = terapia_intensiva[i - 1] || 0;
    terapia_intensiva_giornalieri.push(terapia_intensiva_oggi - terapia_intensiva_ieri);

    const attualmente_positivi_oggi = attualmente_positivi[i];
    const attualmente_positivi_ieri = attualmente_positivi[i - 1] || 0;
    attualmente_positivi_giornalieri.push(attualmente_positivi_oggi - attualmente_positivi_ieri);

    const tamponi_oggi = tamponi[i];
    const tamponi_ieri = tamponi[i - 1] || 0;
    tamponi_giornalieri.push(tamponi_oggi - tamponi_ieri);
  }

  // Rapporti
  for (let i = 0; i < date.length; i++){
    const tamponi_oggi = tamponi_giornalieri[i];
    const casi_oggi = casi_giornalieri[i];
    const rapportoCasiTamponi = ((casi_oggi / tamponi_oggi) * 100).toFixed(2);
    rapporto_tamponi_casi_giornaliero.push(rapportoCasiTamponi);
    
    const persone_testate_oggi = persone_testate_giornalieri[i]
    const rapportoCasiPersone = 0;
    rapportoCasiPersone = ((casi_oggi / persone_testate_oggi) * 100).toFixed(2);
    rapporto_casi_persone_giornaliero.push(rapportoCasiPersone);
  }

  const datasets = {
    date: date,
    decessi: decessi,
    persone_testate: persone_testate,
    persone_testate_giornalieri: persone_testate_giornalieri,
    attualmente_positivi: attualmente_positivi,
    attualmente_positivi_giornalieri: attualmente_positivi_giornalieri,
    decessi_giornalieri: decessi_giornalieri,
    guariti: guariti,
    guariti_giornalieri: guariti_giornalieri,
    terapia_intensiva: terapia_intensiva,
    terapia_intensiva_giornalieri: terapia_intensiva_giornalieri,
    casi: casi,
    casi_giornalieri: casi_giornalieri,
    isolamento_domiciliare: isolamento_domiciliare,
    tamponi: tamponi,
    tamponi_giornalieri: tamponi_giornalieri,
    rapporto_tamponi_casi_giornaliero: rapporto_tamponi_casi_giornaliero,
    rapporto_casi_persone_giornaliero: rapporto_casi_persone_giornaliero,
  }
  return datasets;
}


export function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}