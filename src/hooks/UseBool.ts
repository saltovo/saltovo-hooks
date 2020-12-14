import  { useState ,useMemo} from 'react'

//简单的bool值转换
export default function UseBool(defaultValue = false) {
    const [state, setState] = useState(defaultValue)

    const actions = useMemo(() => {
        const setTrue = () => setState(true);
        const setFalse = () => setState(false);
        const toggle = () => setState(!state)
        return { toggle, setTrue, setFalse };
    }, [state])

    return { state, ...actions }

}