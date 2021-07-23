export interface ITenderiHome {
  id?: number;
}

export class TenderiHome implements ITenderiHome {
  constructor(public id?: number) {}
}

export function getTenderiHomeIdentifier(tenderiHome: ITenderiHome): number | undefined {
  return tenderiHome.id;
}
