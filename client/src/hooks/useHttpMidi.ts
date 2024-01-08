import { useState, useCallback, useEffect } from "react";

import { midiCcEventSource, postMidiCc, postMidiNote } from "../utils/midiCcApi";
import { ConnectionState, MidiState } from "../utils/types";

type UseMidiArgs = {
  apiUrl: string;
};

export const useHttpMidi = ({ apiUrl }: UseMidiArgs) => {
  const [midiState, setMidiState] = useState<MidiState>({ control: {}, key: {}});
  const [connectionState, setConnectionState] =
    useState<ConnectionState>("CONNECTING");

  useEffect(() => {
    const { close } = midiCcEventSource({
      url: apiUrl,
      onData: setMidiState,
      onError: () => {
        setConnectionState("ERRORED");
      },
      onOpen: () => {
        setConnectionState("CONNECTED");
      },
    });
    return () => {
      close();
    };
  }, [apiUrl]);

  const midiControlChange = useCallback(postMidiCc, []);
  const midiNote = useCallback(postMidiNote, [])

  return { connectionState, midiState, midiControlChange, midiNote };
};
