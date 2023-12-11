export interface INote {
  text?: string;
  id?: string;
  tags?: string[]
}

export interface INoteStore {
  notes: INote[];
  noteToEdit: INote;
  tags: string[];
}

export interface IWeatherImageProps {
  symbolCode: string;
  imgSize: string;
  symbolPhrase?: string;
}