import { useState } from 'react'
import Numcontext from './Numcontext'

const Numstate = (props) => {
const [output, setOutput] = useState({value: "0"})
const [value, setValue] = useState({
    first: '0',
    last: '',
    res: "0",
    showres: "0"
})
const [show, setShow] = useState("0")
const [signBit, setSignBit] = useState("1")

    return (
        <Numcontext.Provider value={{ output, setOutput, value, setValue, signBit, setSignBit, show, setShow }}>
            {props.children}
        </Numcontext.Provider>
    )
}

export default Numstate