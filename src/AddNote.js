import React from 'react'
import "./AddNote.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import Tags from './Tags';
import {v4 as uuidv4} from "uuid";
import {Select,Menu,Dropdown} from 'antd';

const AddNote = ({input,setInput,desc,setDesc,todo,setTodo}) => {

    // const items =  [
    //     {
    //       label: 'Open',
    //       key: 'open',
    //     },
    //     {
    //       label: 'Working',
    //       key: 'working',
    //     },
    //     {
    //         label: 'Done',
    //         key: 'done',
    //     },
    //     {
    //         label: 'Overdue',
    //         key: 'overdue',
    //     },
    //   ]
      
      const stat =  ["Open","Working","Done","Overdue"];
    
    const [tags, setTags] = useState([]);
    const [startDate, setStartDate] = useState(new Date()); 
    const [st,Setst ] = useState("Select status");
    const current = new Date();
    var timeStamp = current.toLocaleString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })

    const onInputChange = (e) => {
        setInput(e.target.value);
    };
    const onDescSChange = (e) => {
        setDesc(e.target.value);
    };
    
    const onFormSubmit = (e) => {

        e.preventDefault();
        setTodo([...todo,{id:todo.length+1,timeStamp:timeStamp,title:input,Description:desc,DueDate:startDate,labels:tags,st:st}]);
        setTags([]);
        setInput("");
        setDesc("");

    };

  
    const handleStatus = (e) => {
      console.log(e);
      Setst(e);
    }
     

  return (

    <form onSubmit={onFormSubmit} className='todo__form'>
        <input 
            type="text" 
            placeholder='Enter a Note..' 
            className='todo__input'
            value = {input}
            required
            onChange={onInputChange}
        />
        <textarea
            placeholder='Enter the description ' 
            className='todo__desc'
            value = {desc}
            required
            onChange={onDescSChange}
        />
        <DatePicker 
            selected={startDate} 
            onChange={(date) =>{(date.getDate()>current.getDate() ? setStartDate(date) : alert("Invalid End Date "))}} 
            className='todo__date'
        />  
        <div className='todo__tag'>
            <Tags tags={tags} setTags={setTags}/>
        </div>
        <Select placeholder='Select status' style={{marginLeft:"10px"}} onChange={handleStatus} value={st}>
          {
              stat.map((status,index)=>{
    
                  return <Select.Option key={index} value={status}>{status}</Select.Option>
              } )
          }
        </Select>
        <button className='button__input'>Add</button>
    </form>
  )
}

export default AddNote