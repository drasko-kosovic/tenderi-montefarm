import { Data } from '@angular/router';

export interface IUgovor {
  id?: number;
  brojUgovora?: string;
  datumUgovora?: Data;
  brojOdluke?: string;
  datumOdluke?: Data;
  iznosUgovoraBezPdf?: number;
  sifraPostupka?: number;
  sifraPonude?: number;
  sifraPonudjaca?: number;
}

export class Ugovor implements IUgovor {
  constructor(
    public id?: number,
    public brojUgovora?: string,
    public datumUgovora?: Data,
    public brojOdluke?: string,
    public datumOdluke?: Data,
    public iznosUgovoraBezPdf?: number,
    public sifraPostupka?: number,
    public sifraPonude?: number,
    public sifraPonudjaca?: number
  ) {}
}

export function getUgovorIdentifier(ugovor: IUgovor): number | undefined {
  return ugovor.id;
}
