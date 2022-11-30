import React from 'react'
import "./AddNote.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import Tags from './Tags';
import {v4 as uuidv4} from "uuid";
import {Select,Menu,Dropdown} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const AddNote = ({input,setInput,desc,setDesc,todo,setTodo, originalTodo, setOriginalTodo}) => {

      
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
        setOriginalTodo([...todo,{id:todo.length+1,timeStamp:timeStamp,title:input,Description:desc,DueDate:startDate,labels:tags,st:st}]);
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
      <div style={{margin:"10px" ,marginLeft:"0", fontWeight:"500",fontSize:"1.5rem"}}>Enter Title of Note :-</div>
        <input 
            type="text" 
            placeholder='Enter a Note Title..' 
            className='todo__input'
            value = {input}
            required
            onChange={onInputChange}
        />
        <div style={{margin:"10px" ,marginLeft:"0", fontWeight:"500",fontSize:"1.5rem"}}>Enter Description of Note :-</div>
        <textarea
            placeholder='Enter the description ' 
            className='todo__desc'
            value = {desc}
            required
            onChange={onDescSChange}
        />  
        <div style={{margin:"10px" ,marginLeft:"0", fontWeight:"500",fontSize:"1.5rem"}}>Enter Any Tags for Note :-</div>
        <div className='todo__tag'>
            <Tags tags={tags} setTags={setTags}/>
        </div>
        <div style={{margin:"10px" ,marginLeft:"0", fontWeight:"500",fontSize:"1.5rem"}}>Enter Status of Note :-</div>
        <Select placeholder='Select status' onChange={handleStatus} value={st}>
          {
              stat.map((status,index)=>{
    
                  return <Select.Option key={index} value={status}>{status}</Select.Option>
              } )
          }
        </Select>
        <div style={{margin:"10px" ,marginLeft:"0", fontWeight:"500",fontSize:"1.5rem"}}>Select End Date :-</div>
        <DatePicker 
            selected={startDate} 
            onChange={(date) =>{((date.getDate()>current.getDate()) || (date.getMonth()>current.getMonth()) ? setStartDate(date) : alert("Invalid End Date "))}} 
            className='todo__date'
        />
        <button className='button__input'>Submit</button>
    </form>
  )
}

export default AddNote

// wrapper {
//   display: flex;
//     align-items: center;
//     justify-content: center;
// }

// datepicker-input-contauner {
  // align-items: center;
  //   justify-content: center;
  //   display: flex;
  //   padding-bottom: 1rem;
// }

// todo_date {
  // padding: 0.4rem;
  //   border: none;
// }