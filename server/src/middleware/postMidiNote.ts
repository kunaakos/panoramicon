import { Request, Response, NextFunction } from "express";
import { Output, Note } from "easymidi";

import { MidiKeyState } from "../types";

type PostMidiNoteHandlerArgs = {
    getMidiKeyState: () => MidiKeyState;
    setMidiKeyState: (newState: MidiKeyState) => void;
    updateClients: () => void;
    midiOutput: Output;
};

export const postMidiNoteHandler = ({
    getMidiKeyState,
    setMidiKeyState,
    updateClients,
    midiOutput,
}: PostMidiNoteHandlerArgs) =>
    async function (request: Request, response: Response, next: NextFunction) {

        // TODO: implement reading multiple notes
        const [{ type, note = 64, velocity = 127, channel = 1 }] = request.body;

        const received_note: Note ={
            note,
            velocity,
            channel
        }

        if (type === 'noteon') {
            midiOutput.send('noteon', received_note);
        } else if (type === 'noteoff') {
            midiOutput.send('noteoff', received_note);
        } else {
            response.json({ result: "error" })
            return
        }

        const isOn = type === 'noteon' ? true : false
        setMidiKeyState({
            ...getMidiKeyState(),
            ...{ [note]: isOn }
        });

        response.json({ result: "ok" });
        updateClients();
    };
