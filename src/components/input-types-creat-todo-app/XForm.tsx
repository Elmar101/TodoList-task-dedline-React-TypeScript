import axios from 'axios';
import React, { useState } from 'react'

interface IPROPS  {
  data: { labelName: string; placeholder: string; type: string;}[]
  removeList?: (labelName: string)=> void
}


const XForm: React.FC<IPROPS> = ({data , removeList}) => {
  const [state ,setState] = useState<{label: string ; value: string; }>({label: '' , value: ''});
 const disable = !(state.label && state.value)
  const removeListClick = (labelName: string) => { 
    removeList && removeList(labelName)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState({...state , label: e.target.name , value: e.target.value});
  }

  const SubmitClick = () => {
    axios.post('http://localhost:3000/', {label: state.label , value: state.value})
  }
  return (
    <div style={{ width: "100%" }}> {
      data.map((items , i)=> (<div className="mb-3" key={items.labelName || i}>
        <p className="form-label"> 
        {items.labelName} {items.type === 'teaxtarea' 
        ? <textarea name={items.labelName} placeholder={items.placeholder}></textarea>
        :<input
            type={items.type}
            className="form-control"
            name={items.labelName}
            placeholder ={items.placeholder}
            value={state.value}
            onChange = {(event)=> handleChange(event)}
          />}
        </p>
        <div className='d-flex'>
          <div className = 'd-grid gap-2' style={{width: "50%"}}>
            <button className='btn btn-primary' disabled = {disable} onClick = {SubmitClick}> Submit </button>
          </div>
          <div className = 'd-grid gap-2' style={{width: "50%"}} onClick = {() => removeListClick(items.labelName)}>
            <button className='btn btn-danger'> Remove List </button>
          </div>
        </div>
      </div>))
    } </div>
  )
}

export default XForm