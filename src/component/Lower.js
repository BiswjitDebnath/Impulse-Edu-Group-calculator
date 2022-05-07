import { logDOM } from '@testing-library/react'
import React, { useContext } from 'react'
import '../app.css'
import Numcontext from '../Context/Numcontext'

const Lower = () => {
  const context = useContext(Numcontext)
  const { output, setOutput, value, setValue, signBit, setSignBit } = context

  // function
  function handleMinus() {
    if (!output.value.includes('-'))
      setOutput({ value: `-${output.value}` })
  }

  function handleDot() {
    // for storing in first
    if ((value.first === "0")) {
      output.value.includes('.') ? setOutput({ value: output.value }) : setOutput({ value: `${output.value}.` })
    }
    else {
      if (!value.last.includes('.')) {
        setOutput({ value: `${output.value}.` })
        setValue({ ...value, last: `${value.last}.` })
      }
      else
        setOutput({ value: output.value })
    }
  }

  function handleClear() {
    setOutput({ value: "0" })
    setValue({
      first: "0",
      last: "",
      op: "0"
    })
    setSignBit("1")
  }

  function handleOp(e) {
    if (signBit === '1') {
      setValue({ ...value, first: (output.value), op: e.target.innerText })
      setOutput({ value: output.value + e.target.innerHTML })
      setSignBit("0")
    }
    else {
      setOutput({ value: output.value })
    }
  }

  function handleClick(e) {
    if (output.value === "0" && value.op === "0" || output.value === "-0") {
      if (output.value === "-0") {
        setOutput({ value: "-" + e.target.innerHTML })
        // setValue({ ...value, res: "-" + e.target.innerHTML })
      }
      else {
        setOutput({ value: e.target.innerHTML })
        // setValue({ ...value, res: e.target.innerHTML })
      }
    }
    else if (value.op === "0") {
      setOutput({ value: output.value + e.target.innerHTML })
      // setValue({ ...value, res: value.res + e.target.innerHTML })
    }
    else {
      setOutput({ value: output.value + e.target.innerHTML })
      setValue({ ...value, last: value.last + (e.target.innerHTML) })
    }
    setSignBit("1")
  }

  function handleRes() {
    if (value.op === "+") {
      const res = parseFloat(value.first) + parseFloat(value.last)
      setValue({ ...value, res: res })
    }
    else if (value.op === '-') {
      const res = parseFloat(value.first) - parseFloat(value.last)
      setValue({ ...value, res: res })
    }
    else if (value.op === '×') {
      const res = parseFloat(value.first) * parseFloat(value.last)
      setValue({ ...value, res: +res.toPrecision(3) })
    }
    else if (value.op === '÷') {
      const res = parseFloat(value.first) / parseFloat(value.last)
      setValue({ ...value, res: +res.toPrecision(3) })
    }
    else{
      const res = parseFloat(value.first) % parseFloat(value.last)
      setValue({ ...value, res: +res.toPrecision(3) })
    }

  }

  return (
    <div className='lower'>
      {/* 1st row */}
      <div className='rowwise'>
        <div className='colwise' onClick={handleClear} style={{ fontFamily: "'Koulen', cursive", fontSize: "x-large" }}>C</div>
        <div className='colwise' onClick={handleMinus}>+/-</div>
        <div className='colwise' onClick={handleOp}>%</div>
        <div className='colwise' onClick={handleOp}><>	&divide;</></div>
      </div>
      <div className='rowwise'>
        <div className='colwise' onClick={handleClick}>7</div>
        <div className='colwise' onClick={handleClick}>8</div>
        <div className='colwise' onClick={handleClick}>9</div>
        <div className='colwise' onClick={handleOp}>&times;</div>
      </div>
      <div className='rowwise'>
        <div className='colwise' onClick={handleClick}>4</div>
        <div className='colwise' onClick={handleClick}>5</div>
        <div className='colwise' onClick={handleClick}>6</div>
        <div className='colwise' onClick={handleOp}>-</div>
      </div>
      <div className='rowwise'>
        <div className='colwise' onClick={handleClick}>1</div>
        <div className='colwise' onClick={handleClick}>2</div>
        <div className='colwise' onClick={handleClick}>3</div>
        <div className='colwise' onClick={handleOp}>+</div>
      </div>
      <div className='rowwise'>
        <div className='colwise zero' style={{ justifyContent: "flex-start", paddingLeft: "15px" }}>0</div>
        <div className='colwise' onClick={handleDot}>.</div>
        <div className='colwise' onClick={handleRes}>=</div>
      </div>
    </div>
  )
}

export default Lower