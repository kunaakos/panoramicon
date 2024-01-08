import { MidiControlState } from "../types";

let midiControlState: MidiControlState = {};

export const getMidiControlState = () => midiControlState; // !

export const setMidiControlState = (newState: MidiControlState) => {
  midiControlState = newState;
};
