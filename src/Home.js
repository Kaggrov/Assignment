import React, { useEffect, useState } from 'react'
import Header from './Header';
import AddNote from './AddNote';
import Table from './Table';
import './Home.css';

const Home = () => {
    const [input,setInput] = useState("");
    const [desc,setDesc] = useState("");
    const [todo,setTodo] = useState([]);


  return (
    <div className='parent__container'>
      <div className='parent__box'>
          <Header/>
          <AddNote
            input = {input}
            setInput = {setInput}
            desc = {desc}
            setDesc = {setDesc}
            todo = {todo}
            setTodo = {setTodo}
          />
          <Table todo = {todo} setTodo={setTodo}/>
      </div>
    </div>
  )
}

export default Home