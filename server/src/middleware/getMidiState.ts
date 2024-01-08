import { Request, Response, NextFunction } from "express";

import { Client, MidiKeyState, MidiControlState, MidiState } from "../types";

type GetMidiCcHandlerArgs = {
  getMidiControlState: () => MidiControlState;
  getMidiKeyState: () => MidiKeyState;
  removeClient: (clientId: number) => void;
  addClient: (newClient: Client) => void;
};

export const getMidiStateHandler =
  ({ getMidiControlState, getMidiKeyState, removeClient, addClient }: GetMidiCcHandlerArgs) =>
  (request: Request, response: Response, next: NextFunction) => {


    const headers = {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    };
    response.writeHead(200, headers);

    const midiState: MidiState = {
      control: getMidiControlState(),
      key: getMidiKeyState()
    }

    const data = `data: ${JSON.stringify(midiState)}\n\n`;
    response.write(data);

    const clientId = Date.now();

    const newClient = {
      id: clientId,
      response,
    };

    addClient(newClient);

    request.on("close", () => {
      removeClient(clientId);
    });
  };
