import { useEffect, useRef, useState } from 'react'

export default function useHover(target, Enter = function () { }, Leave = function () { }) {
    const [isHover, setIsHover] = useState(false)
    const onEnter = useRef()
    const onLeave = useRef()
    const eventTarget = target.current
    console.log(eventTarget)
    if (typeof (Enter) === 'function') {
        onEnter.current = Enter
    }
    if (typeof (Leave) === 'function') {
        onLeave.current = Leave
    }

    useEffect(() => {
        if (eventTarget) {
            eventTarget.addEventListener('mouseenter', () => {
                setIsHover(true)
                onEnter.current || onEnter.current()
            })
            eventTarget.addEventListener('mouseleave', () => {
                setIsHover(false)
                onLeave.current || onLeave.current()
            })
        }

        return () => {
            eventTarget && eventTarget.removeEventListener('mouseenter')
            eventTarget && eventTarget.removeEventListener('mouseleave')
        }
    }, [typeof target === 'function' ? undefined : target])

    return isHover
}