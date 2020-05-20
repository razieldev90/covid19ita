export class CountDownTimer{
  constructor(){
    this.ticker;
    this.secTime;
    this.output = document.getElementById('timer');
    this.countDown();
  }

  countDown(){
    let oggi = new Date();
    let domani = new Date(oggi.getFullYear(), oggi.getMonth(), oggi.getDate()+1, 18, 30, 0);
    let tempoOggi = oggi.getTime();
    let tempoDomani = domani.getTime();
    let tempo_rimanente_in_secondi = parseInt((tempoDomani - tempoOggi) / 1000);

    var curtime = oggi.getTime(); //current time
    var atime = domani.getTime(); //countdown time
    var diff = parseInt((atime - curtime) / 1000);
    if (diff <= 0) { diff = 86400 }
    this.startCountdown(diff);
  }

  startCountdown(secs) {
    this.secTime = parseInt(secs);
    this.ticker = setInterval(() => this.tick(), 1000);
    this.tick(); //initial count display
    }
  
  tick() {
    var secs = this.secTime;
    if (secs>0) {
      this.secTime--;
    } else {
      clearInterval(this.ticker);
      this.countDown(); //start over
    }

    secs %= 86400;
    var hours= Math.floor(secs/3600);
    secs %= 3600;
    var mins = Math.floor(secs/60);
    secs %= 60;

    this.output.innerHTML = `Prossimo aggiornamento tra ${((hours < 10 ) ? "0" : "" ) + hours}:${((mins < 10) ? "0" : "" ) + mins}:${((secs < 10) ? "0" : "" ) + secs}`
  }
}
