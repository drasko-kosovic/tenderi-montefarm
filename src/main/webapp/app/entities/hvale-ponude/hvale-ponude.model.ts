export interface IHvalePonude {
  id?: number;
  sifraPostupka?: number | null;
  brojPartije?: number | null;
  inn?: string | null;
  farmaceutskiOblikLijeka?: string | null;
  pakivanje?: string | null;
  trazenaKolicina?: number | null;
  procijenjenaVrijednost?: number | null;
}

export class HvalePonude implements IHvalePonude {
  constructor(
    public id?: number,
    public sifraPostupka?: number | null,
    public brojPartije?: number | null,
    public inn?: string | null,
    public farmaceutskiOblikLijeka?: string | null,
    public pakivanje?: string | null,
    public trazenaKolicina?: number | null,
    public procijenjenaVrijednost?: number | null
  ) {}
}

export function getHvalePonudeIdentifier(hvalePonude: IHvalePonude): number | undefined {
  return hvalePonude.id;
}
