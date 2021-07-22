export interface IPonudePonudjaci {
  id?: number;
  sifraPostupka?: number;
  sifraPonude?: number;
  nazivPonudjaca?: string;
}

export class PonudePonudjaci implements IPonudePonudjaci {
  constructor(public id?: number, public sifraPostupka?: number, public sifraPonude?: number, public nazivPonudjaca?: string) {}
}

export function getPonudeIdentifier(ponude_ponudjaci: IPonudePonudjaci): number | undefined {
  return ponude_ponudjaci.id;
}
