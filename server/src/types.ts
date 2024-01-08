export type Client = {
  id: number;
  response: any;
};

export type MidiControlState = {
  [key: number]: number;
};

export type MidiKeyState = {
  [key: number]: boolean;
};

export type MidiState = {
  control: MidiControlState;
  key: MidiKeyState;
}

export type CcOffset = {
  number: number;
  by: number;
};


