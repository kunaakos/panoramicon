import { useState } from "react";
import { chunk } from "lodash-es";

import { defaultTo64IfUndefined } from "../utils/control";

import { Controls, Grid, ProceedKey, Keys, SquareKey } from "./Grid";
import { Control } from "./Control";

import { useHttpMidi } from "../hooks/useHttpMidi";

import { API_URL, PANORAMICAL_MIDI_CC_NUMBERS } from "../utils/constants";

export const App = () => {
  const { midiState, midiControlChange, midiNote } = useHttpMidi({ apiUrl: API_URL });
  const [locked, setLocked] = useState({ x: false, y: false})
  const ccValues = PANORAMICAL_MIDI_CC_NUMBERS.map((controlNumber) => [
    controlNumber,
    defaultTo64IfUndefined(midiState.control[controlNumber]),
  ]);
  const proceedPressed = midiState.key[64]


  return (
    <>
      <Grid>
        <Controls>
          {chunk(ccValues, 2).map(([x, y]) => (
            <Control
              key={`${x[0]}-${y[0]}`}
              x={x[1]}
              xLocked={locked.x}
              y={y[1]}
              yLocked={locked.y}
              offset={(xBy, yBy) =>
                midiControlChange([
                  { number: x[0], by: xBy },
                  { number: y[0], by: yBy },
                ])
              }
            />
          ))}
        </Controls>
        <Keys>
          <ProceedKey
            onTouchStart={() => midiNote([
              { type: 'noteon', note: 64}
            ])}
            onTouchEnd={() => midiNote([
              { type: 'noteoff', note: 64}
            ])}
            className={proceedPressed ? 'active' : undefined}
          />
          <SquareKey
            onTouchStart={() => setLocked({...locked, x: !locked.x})}
            className={locked.x ? 'active' : undefined}
          />
          <SquareKey
            onTouchStart={() => setLocked({...locked, y: !locked.y})}
            className={locked.y ? 'active' : undefined}
          />
        </Keys>
      </Grid>
    </>
  );
};
