import { API_URL } from "./constants";
import { MidiControlChangeOffset, MidiNote, MidiState } from "./types";

export const postMidiCc = (allOffsets: MidiControlChangeOffset[]) => {
  const offsets = allOffsets.filter((offset) => offset.by !== 0);
  if (offsets.length < 1) return;
  fetch(`${API_URL}/cc`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(offsets),
  });
};

export const postMidiNote = (notes: MidiNote[]) => {
  fetch(`${API_URL}/note`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notes),
  });
};

type MidiCcEventSourceArgs = {
  onData: (data: MidiState) => void;
  onOpen: () => void;
  onError: () => void;
  url: string;
};

export const midiCcEventSource = ({
  onData,
  onOpen,
  onError,
  url,
}: MidiCcEventSourceArgs) => {
  const events = new EventSource(url);

  events.onmessage = (event: MessageEvent) => {
    const parsedData = JSON.parse(event.data);
    onData && onData(parsedData);
  };

  events.onopen = () => {
    onOpen && onOpen();
  };

  events.onerror = () => {
    onError && onError();
  };

  return {
    close: () => events.close(),
  };
};
