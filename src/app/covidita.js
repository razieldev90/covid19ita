import { dynamicsort } from './helpers';

class CovidITA {
  constructor(){}

  async fetchAll(){
    const [responseNazionali, responseRegionali, responseProvinciali] = await Promise.all([
      fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json'),
      fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json'),
      fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json')
    ]);
    
    const andamento_nazionale = await responseNazionali.json();
    const andamento_regionale = await responseRegionali.json();
    const andamento_provinciale = await responseProvinciali.json();

    return {
      andamento_nazionale: andamento_nazionale,
      andamento_regionale: andamento_regionale,
      andamento_provinciale: andamento_provinciale,
    }
  }

  async fetchAndamentoNazionale(){
    const response = await fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json');
    const andamento_nazionale = await response.json()
    // console.log(andamento_nazionale);
    return andamento_nazionale;
  }

  async fetchAndamentoRegionale(){
    const response = await fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json');
    const andamento_regionale = await response.json()
    // console.log(andamento_regionale);
    return andamento_regionale;
  }

  async fetchAndamentoProvinciale(){
    const response = await fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json');
    const andamento_provinciale = await response.json()
    // console.log(andamento_provinciale);
    return andamento_provinciale;
  }

  async getLatestNational(){
    const response = await fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale-latest.json');

    const datiNazionali = await response.json();

    return datiNazionali[0];
  }
  
  async getLatestRegioni(){
    const response = await fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json');

    const datiRegionali = (await response.json()).sort(dynamicsort('denominazione_regione'));

    return datiRegionali;
  }

  async getLatestProvincie(){
    const response = await fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province-latest.json');

    const datiProvinciali = await response.json();

    let inDefinizione = datiProvinciali.filter((value, index, arr) => { return value.denominazione_provincia === 'In fase di definizione/aggiornamento'});
    let provincie = datiProvinciali.filter((value, index, arr) => { return value.denominazione_provincia !== 'In fase di definizione/aggiornamento'});

    provincie = provincie.sort(dynamicsort('denominazione_provincia'));

    return [provincie, inDefinizione];
  }
  async getNote(){
    const response = await fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-note-it.json');
    const note = await response.json();
    console.log(note);
    return note;
  }
}

export const request = new CovidITA();