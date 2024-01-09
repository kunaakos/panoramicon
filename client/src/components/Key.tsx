import styled from "@emotion/styled/macro"

export const Key = styled.div`
  background-color: white;
  opacity: 0.7;
  transition: opacity ease-in;
  margin: 1rem;
  @media (orientation: landscape) {
    width: calc(100% - 2rem);
  }
  @media (orientation: portrait) {
    height: calc(100% - 2rem);
  }

  &.active {
    opacity: 1;
  }
`

export const ProceedKey = styled(Key)`
  @media (orientation: landscape) {
    height: calc(100% / 3 * 2 - 2rem);
  }
  @media (orientation: portrait) {
    width: calc(100% / 3 * 2 - 2rem);
  }
`

export const LockKey = styled(Key)`
  @media (orientation: landscape) {
    height: calc(100% / 6 - 2rem);
  }
  @media (orientation: portrait) {
    width: calc(100% / 6 - 2rem);
  }
`
