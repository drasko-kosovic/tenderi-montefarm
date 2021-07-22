import * as dayjs from 'dayjs';

export interface IPrvorangirani {
  id?: number;
  sifraPostupka?: number | null;
  sifraPonude?: number | null;
  brojPartije?: number | null;
  atc?: string | null;
  inn?: string | null;
  zasticeniNaziv?: string | null;
  farmaceutskiOblikLijeka?: string | null;
  jacinaLijeka?: string | null;
  pakovanje?: string | null;
  trazenaKolicina?: number | null;
  procijenjenaVrijednost?: number | null;
  ponudjenaVrijednost?: number | null;
  rokIsporuke?: number | null;
  nazivPonudjaca?: string | null;
  nazivProizvodjaca?: string | null;
  bodIsporuka?: number | null;
  ponudjaci?: number;
  bodCijena?: number | null;
  bodRok?: number | null;
  bodUkupno?: number | null;
}

export class Prvorangirani implements IPrvorangirani {
  constructor(
    public id?: number,
    public sifraPostupka?: number | null,
    public sifraPonude?: number | null,
    public brojPartije?: number | null,
    public atc?: string | null,
    public inn?: string | null,
    public zasticeniNaziv?: string | null,
    public farmaceutskiOblikLijeka?: string | null,
    public jacinaLijeka?: string | null,
    public pakovanje?: string | null,
    public trazenaKolicina?: number | null,
    public trazenaJedinicnaCijena?: number | null,
    public procijenjenaVrijednost?: number | null,
    public ponudjenaVrijednost?: number | null,
    public rokIsporuke?: number | null,
    public nazivPonudjaca?: string | null,
    public nazivProizvodjaca?: string | null,
    public bodIsporuka?: number | null,
    public brojUgovora?: string | null,
    public datumUgovora?: dayjs.Dayjs | null,
    public ponudjaci?: number,
    public bodCijena?: number | null,
    public bodRok?: number | null,
    public bodUkupno?: number | null
  ) {}
}

export function getPrvorangiraniIdentifier(prvorangirani: IPrvorangirani): number | undefined {
  return prvorangirani.id;
}
