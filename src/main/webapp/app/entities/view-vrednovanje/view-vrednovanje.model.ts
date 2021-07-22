export interface IViewVrednovanje {
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
  nazivProizvodjaca?: string | null;
  bodCijena?: number | null;
  bodRok?: number | null;
  bodUkupno?: number | null;
  ponudjaci?: number;
}

export class ViewVrednovanje implements IViewVrednovanje {
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
    public procijenjenaVrijednost?: number | null,
    public ponudjenaVrijednost?: number | null,
    public rokIsporuke?: number | null,
    public nazivProizvodjaca?: string | null,
    public bodCijena?: number | null,
    public bodRok?: number | null,
    public bodUkupno?: number | null,
    public ponudjaci?: number
  ) {}
}

export function getViewVrednovanjeIdentifier(viewVrednovanje: IViewVrednovanje): number | undefined {
  return viewVrednovanje.id;
}
