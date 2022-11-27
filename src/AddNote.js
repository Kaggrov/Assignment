import React from 'react'
import "./AddNote.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import Tags from './Tags';
import {v4 as uuidv4} from "uuid";
import {Select} from 'antd';

const AddNote = ({input,setInput,desc,setDesc,todo,setTodo}) => {

    const items =  [
        {
          label: 'Open',
          key: 'open',
        },
        {
          label: 'Working',
          key: 'working',
        },
        {
            label: 'Done',
            key: 'done',
        },
        {
            label: 'Overdue',
            key: 'overdue',
        },
      ]
    

    const [tags, setTags] = useState([]);
    const [startDate, setStartDate] = useState(new Date()); 
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
        setTodo([...todo,{id:uuidv4(),timeStamp:timeStamp,title:input,Description:desc,DueDate:startDate,labels:tags}]);
        setInput("");
        setDesc("");

    };

     

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
            onChange={(date) =>setStartDate(date)} 
            className='todo__date'
        />  
        <div className='todo__tag'>
            <Tags tags={tags} setTags={setTags}/>
        </div>
        
        <button className='button__input'>Add</button>
    </form>
  )
}

export default AddNote