import React, { useContext } from 'react'
import '../app.css'
import Numcontext from '../Context/Numcontext'

const Upper = () => {
    const context = useContext(Numcontext)
    const { output, value } = context

    return (
        <div className='upper'>
            <div className='instruction'>{output.value}</div>
            <div className='result'>{value.res}</div>
        </div>
    )
}

export default Upper