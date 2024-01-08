import { MidiKeyState } from "../types";

let midiKeyState: MidiKeyState = {};

export const getMidiKeyState = () => midiKeyState; // !

export const setMidiKeyState = (newState: MidiKeyState) => {
  midiKeyState = newState;
};
