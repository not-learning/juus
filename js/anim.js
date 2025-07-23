"use strict";

export function lin(spd = 0.02) {
  let n = 0
  return function() {
    return n = Math.min(1, n + spd)
  }
}

export function ease(spd = 0.05) {
  let n = -pi_2
  return function(pitch = 1.3) {
    n = Math.min(pi_2, n + spd)
    return (Math.atan(pitch * Math.sin(n)) / Math.atan(pitch) + 1) / 2
  }
}

export function ksf(k, start = 0, finish = 1) {
  return start + (finish - start) * k
}
