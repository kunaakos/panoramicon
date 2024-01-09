import { useState } from "react"
import { chunk } from "lodash-es"

import { defaultTo64IfUndefined } from "../utils/control"

import { Controls, Grid, ProceedKey, Keys, LockKey } from "./Grid"
import { Control } from "./Control"

import { useHttpMidi } from "../hooks/useHttpMidi"

import { API_URL, PANORAMICAL_MIDI_CC_NUMBERS } from "../utils/constants"

const useLockState = () => {
  const [state, setState] = useState({ x: false, y: false })

  const toggleX = () => {
    const newStateX = !state.x
    const newState = {
      x: newStateX,
      y: newStateX ? false : state.y
    }
    setState(newState)
  }

  const toggleY = () => {
    const newStateY = !state.y
    const newState = {
      x: newStateY ? false : state.x,
      y: newStateY
    }
    setState(newState)
  }

  return {
    locked: state,
    toggle: { x: toggleX, y: toggleY }
  }
}

export const App = () => {
  const { midiState, midiControlChange, midiNote } = useHttpMidi({ apiUrl: API_URL })
  const { locked, toggle } = useLockState()
  const controlValues = PANORAMICAL_MIDI_CC_NUMBERS.map((controlNumber) => [
    controlNumber,
    defaultTo64IfUndefined(midiState.control[controlNumber]),
  ])
  const proceedPressed = midiState.key[64]


  return (
    <>
      <Grid>
        <Controls>
          {chunk(controlValues, 2).map(([x, y]) => (
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
              { type: 'noteon', note: 64 }
            ])}
            onTouchEnd={() => midiNote([
              { type: 'noteoff', note: 64 }
            ])}
            className={proceedPressed ? 'active' : undefined}
          />
          <LockKey
            onTouchStart={toggle.x}
            className={locked.x ? 'active' : undefined}
          />
          <LockKey
            onTouchStart={toggle.y}
            className={locked.y ? 'active' : undefined}
          />
        </Keys>
      </Grid>
    </>
  )
}
