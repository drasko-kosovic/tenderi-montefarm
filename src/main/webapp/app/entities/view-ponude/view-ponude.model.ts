import * as dayjs from 'dayjs';

export interface IViewPonude {
  id?: number;
  sifraPostupka?: number;
  sifraPonude?: number;
  brojPartije?: number;
  sifraPonudjaca?: string;
  nazivPonudjaca?: string | null;
  zasticeniNaziv?: string | null;
  ponudjenaVrijednost?: number | null;
  rokIsporuke?: number | null;
  datumPonude?: dayjs.Dayjs | null;
  nazivProizvodjaca?: string | null;
  sum?: number;
}

export class ViewPonude implements IViewPonude {
  constructor(
    public id?: number,
    public sifraPostupka?: number,
    public sifraPonude?: number,
    public brojPartije?: number,
    public sifraPonudjaca?: string,
    public nazivPonudjaca?: string | null,
    public zasticeniNaziv?: string | null,
    public ponudjenaVrijednost?: number | null,
    public rokIsporuke?: number | null,
    public datumPonude?: dayjs.Dayjs | null,
    public nazivProizvodjaca?: string | null,
    public sum?: number
  ) {}
}

export function getViewPonudeIdentifier(viewPonude: IViewPonude): number | undefined {
  return viewPonude.id;
}
