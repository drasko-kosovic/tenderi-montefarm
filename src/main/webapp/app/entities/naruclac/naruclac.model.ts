export interface INaruclac {
  id?: number;
  naziv?: string;
  adresa?: string | null;
  racun?: string | null;
  telefon?: string | null;
  pib?: string | null;
  pdv?: string | null;
  odgovornoLiceNarucioca?: string | null;
  email?: string | null;
}

export class Naruclac implements INaruclac {
  constructor(
    public id?: number,
    public naziv?: string,
    public adresa?: string | null,
    public racun?: string | null,
    public telefon?: string | null,
    public pib?: string | null,
    public pdv?: string | null,
    public odgovornoLiceNarucioca?: string | null,
    public email?: string | null
  ) {}
}

export function getNaruclacIdentifier(naruclac: INaruclac): number | undefined {
  return naruclac.id;
}
