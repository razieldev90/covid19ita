export class Language{
  constructor(country, obj){
    this.country = country ? country : 'en';
    this.obj = obj;
  }

  getString(str){
    return this.obj[this.country][str] || 'default string';
  }
}