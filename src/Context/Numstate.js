import { useState } from 'react'
import Numcontext from './Numcontext'

const Numstate = (props) => {
const [output, setOutput] = useState({value: "0"})
const [value, setValue] = useState({
    first: '0',
    last: '',
    op: "0",
    res: "0",
})
const [signBit, setSignBit] = useState("1")

    return (
        <Numcontext.Provider value={{ output, setOutput, value, setValue, signBit, setSignBit }}>
            {props.children}
        </Numcontext.Provider>
    )
}

export default Numstate