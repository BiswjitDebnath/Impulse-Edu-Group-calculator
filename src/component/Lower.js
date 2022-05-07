import React, { useContext, useEffect, useState } from 'react'
import '../app.css'
import Numcontext from '../Context/Numcontext'

const Lower = () => {

  const [final, setFinal] = useState("flase") //only show result at last of calculation
  const [op, setOp] = useState("0")  //Storing operator
  const [twice, setTwice] = useState("0") // to handle multiple operator in online

  const context = useContext(Numcontext)
  const { output, setOutput, value, setValue, signBit, setSignBit, show, setShow } = context

  useEffect(() => {
    setValue({ ...value, first: value.res, last: '' })
  }, [value.res])

  useEffect(() => {
    setShow(value.res)
    setFinal("false")
  }, [final])

  

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
    })
    setOp("0")
    setSignBit("1")
    setShow("0")
  }

  const handleOp = async (e) => {
    // first time taking operator
    if (signBit === '1' && op.includes('0')) {
      setValue({ ...value, first: (output.value)})
      setOp(e.target.innerText)
      setOutput({ value: output.value + e.target.innerHTML })
      setSignBit("0")
    }
    // it is not first time
    else if (signBit === '1' && !op.includes('0')) {
      await handleRes()
      setOutput({ value: output.value + e.target.innerHTML })
      // console.log("logging from compo"+temp);
      // if(twice === '0')
      setOp(e.target.innerText)
      setSignBit("0")
    }
    // operator taking consecutively
    else {
      setOutput({ value: output.value })
    }
  }

  function handleClick(e) {
    // taking first digit
    if (output.value === "0" && op === "0" || output.value === "-0") {
      if (output.value === "-0") {
        setOutput({ value: "-" + e.target.innerHTML })
        // setValue({ ...value, res: "-" + e.target.innerHTML })
      }
      else {
        setOutput({ value: e.target.innerHTML })
        // setValue({ ...value, res: e.target.innerHTML })
      }
    }
    // taking first number
    else if (op === "0") {
      setOutput({ value: output.value + e.target.innerHTML })
    }
    //Taking second number 
    else {
      setOutput({ value: output.value + e.target.innerHTML })
      setValue({ ...value, last: value.last + (e.target.innerHTML) })
    }
    setSignBit("1")
  }

  const handleRes = async () => {
    console.log("hi");
    // for addition
    if (op === "+") {
      const res = (parseFloat(value.first) + parseFloat(value.last))
      await setValue({ ...value, res: res })

    }
    // for substraction
    else if (op === '-') {
      const res = parseFloat(value.first) - parseFloat(value.last)
      setValue({ ...value, res: res })
    }
    // for multiplication
    else if (op === '×') {
      const res = parseFloat(value.first) * parseFloat(value.last)
      setValue({ ...value, res: +res.toPrecision(3) })
    }
    // for division
    else if (op === '÷') {
      const res = parseFloat(value.first) / parseFloat(value.last)
      setValue({ ...value, res: +res.toPrecision(3) })
    }
    // for modulo
    else {
      const res = parseFloat(value.first) % parseFloat(value.last)
      setValue({ ...value, res: +res.toPrecision(3) })
    }
  }
  
  function equal() {
    handleRes()
    setFinal("true")
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
      {/* second row */}
      <div className='rowwise'>
        <div className='colwise' onClick={handleClick}>7</div>
        <div className='colwise' onClick={handleClick}>8</div>
        <div className='colwise' onClick={handleClick}>9</div>
        <div className='colwise' onClick={handleOp}>&times;</div>
      </div>
      {/* 3rd row */}
      <div className='rowwise'>
        <div className='colwise' onClick={handleClick}>4</div>
        <div className='colwise' onClick={handleClick}>5</div>
        <div className='colwise' onClick={handleClick}>6</div>
        <div className='colwise' onClick={handleOp}>-</div>
      </div>
      {/* 4th row */}
      <div className='rowwise'>
        <div className='colwise' onClick={handleClick}>1</div>
        <div className='colwise' onClick={handleClick}>2</div>
        <div className='colwise' onClick={handleClick}>3</div>
        <div className='colwise' onClick={handleOp}>+</div>
      </div>
      {/* 5th row */}
      <div className='rowwise'>
        <div className='colwise zero' style={{ justifyContent: "flex-start", paddingLeft: "15px" }}>0</div>
        <div className='colwise' onClick={handleDot}>.</div>
        <div className='colwise' onClick={equal}>=</div>
      </div>
    </div>
  )
}

export default Lower