export type Nullable<T> = T | null;

export type Pair = [number, number];

export type MidiControlState = {
  [key: number]: number;
};

export type MidiKeyState = {
  [key: number]: boolean;
}

export type MidiState = {
  control: MidiControlState;
  key: MidiKeyState;
}

export type ConnectionState = "CONNECTING" | "CONNECTED" | "ERRORED";

export type MidiControlChangeOffset = {
  number: number;
  by: number;
};

export type MidiNote = {
  type: 'noteon' | 'noteoff';
  note: number;
  velocity?: number;
  channel?: number;
}
