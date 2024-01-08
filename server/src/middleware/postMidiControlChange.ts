import { clamp } from "lodash";
import { Request, Response, NextFunction } from "express";
import { Output, ControlChange } from "easymidi";

import { MIDI_CC_VALUE_MAX, MIDI_CC_VALUE_MIN } from "../constants";
import { Client, MidiControlState } from "../types";
import { defaultTo64IfUndefined } from "../utils";

type PostMidiControlHandlerArgs = {
  getMidiControlState: () => MidiControlState;
  setMidiControlState: (newState: MidiControlState) => void;
  updateClients: () => void;
  midiOutput: Output;
};

export const postMidiControlChangeHandler = ({
  getMidiControlState,
  setMidiControlState,
  updateClients,
  midiOutput,
}: PostMidiControlHandlerArgs) =>
  async function (request: Request, response: Response, next: NextFunction) {
    const offsets = request.body;
    if (offsets.length < 1) return;

    const MidiControlState = getMidiControlState();

    const newMidiControlValues: MidiControlState = offsets.reduce(
      (acc: MidiControlState, { number, by }: { number: number; by: number }) => {
        return {
          ...acc,
          [number]: clamp(
            defaultTo64IfUndefined(MidiControlState[number]) + by,
            MIDI_CC_VALUE_MIN,
            MIDI_CC_VALUE_MAX
          ),
        };
      },
      {}
    );
      
    Object.entries(newMidiControlValues).forEach(([controller, value]) => {
      if (typeof value !== "number") return;
      const controlChange: ControlChange = {
        controller: parseInt(controller), // !
        value,
        channel: 1,
      };
      midiOutput.send("cc", controlChange);
    });

    setMidiControlState({
      ...MidiControlState,
      ...newMidiControlValues,
    });

    response.json({ result: "ok" });

    updateClients();

  };
