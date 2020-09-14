import React, { useRef } from 'react'

export default (state, compare = undefined) => {

    const previousState = useRef();
    const currentState = useRef();
    const bool = typeof (compare) === 'function' ? compare(currentState.current, state) : true

    if (bool) {
        previousState.current = currentState.current
        currentState.current = state
    }

    return previousState.current
}