import React, { useContext } from 'react'
import '../app.css'
import Numcontext from '../Context/Numcontext'

const Upper = () => {
    const context = useContext(Numcontext)
    const { output, value, show, setShow } = context
    if(show === 'NaN')
        setShow("Mail biswajit.basanti@gmail.com about this problem")
    return (
        <div className='upper'>
            <div className='instruction'>{output.value}</div>
            <div className='result'>{ show }</div>
        </div>
    )
}

export default Upper