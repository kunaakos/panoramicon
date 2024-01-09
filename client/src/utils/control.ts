import { TouchEvent } from "react"

import { Pair } from "./types"
import { MIDI_CC_VALUE_MAX } from "./constants"

const xOf = (values: Pair) => values[0]
const yOf = (values: Pair) => values[1]

export const getTouchCoords = (e: TouchEvent): Pair => [
  e.targetTouches[0].pageX,
  e.targetTouches[0].pageY,
]

export const getOffset = (from: Pair, to: Pair): Pair => [
  xOf(to) - xOf(from),
  yOf(to) - yOf(from),
]

export const pxToMidi = (value: number, containerWidth: number): number =>
  Math.round((value * MIDI_CC_VALUE_MAX) / containerWidth)

export const midiToPx = (value: number, containerWidth: number): number =>
  (value * containerWidth) / MIDI_CC_VALUE_MAX

export const pxOffsetToMidiOffset = (
  values: Pair,
  containerWidth: number
): Pair => [
    pxToMidi(xOf(values), containerWidth),
    pxToMidi(yOf(values), containerWidth),
  ]

export const defaultTo64IfUndefined = (value: number | undefined): number =>
  typeof value === "number" ? value : 64
