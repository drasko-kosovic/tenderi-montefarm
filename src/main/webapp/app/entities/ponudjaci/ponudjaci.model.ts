export interface IPonudjaci {
  id?: number;
  nazivPonudjaca?: string;
  odgovornoLice?: string;
  adresaPonudjaca?: string;
  bankaRacun?: string;
}

export class Ponudjaci implements IPonudjaci {
  constructor(
    public id?: number,
    public nazivPonudjaca?: string,
    public odgovornoLice?: string,
    public adresaPonudjaca?: string,
    public bankaRacun?: string
  ) {}
}

export function getPonudjaciIdentifier(ponudjaci: IPonudjaci): number | undefined {
  return ponudjaci.id;
}
