export interface IPostupci {
  id?: number;
  sifraPostupka?: number;
  brojTendera?: string | null;
  opisPostupka?: string;
  vrstaPostupka?: string;
  datumObjave?:Date;
}

export class Postupci implements IPostupci {
  constructor(
    public id?: number,
    public sifraPostupka?: number,
    public brojTendera?: string | null,
    public opisPostupka?: string,
    public vrstaPostupka?: string,
    public datumObjave?: Date
  ) {}
}

export function getPostupciIdentifier(postupci: IPostupci): number | undefined {
  return postupci.id;
}
