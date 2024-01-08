import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createProxyMiddleware } from 'http-proxy-middleware';
import easymidi, { Output } from "easymidi";

import { PORT } from "./constants";

import { getServerStateHandler } from "./middleware/getServerState";
import { getMidiStateHandler } from "./middleware/getMidiState";
import { postMidiControlChangeHandler } from "./middleware/postMidiControlChange";
import { postMidiNoteHandler } from "./middleware/postMidiNote";

import { getMidiControlState, setMidiControlState } from "./services/midiControlState";
import { getMidiKeyState, setMidiKeyState } from "./services/midiKeyState";
import { getClients, removeClient, addClient, sendToAllClients } from "./services/client";
import { MidiState } from "./types";

console.log(easymidi.getOutputs());
var midiOutput = new Output("panoramicon", true);

const updateClients = () => {
  console.log('updating clients!')
  const midiState: MidiState = {
    control: getMidiControlState(),
    key: getMidiKeyState()
  }
  sendToAllClients(midiState)
}

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/server", getServerStateHandler({ getClients }));
app.get(
  "/midi",
  getMidiStateHandler({ getMidiControlState, getMidiKeyState, removeClient, addClient })
);
app.post(
  "/midi/cc",
  postMidiControlChangeHandler({ getMidiControlState, setMidiControlState, updateClients, midiOutput })
);
app.post(
  "/midi/note",
  postMidiNoteHandler({ getMidiKeyState, setMidiKeyState, updateClients, midiOutput })
);

app.use('/', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
