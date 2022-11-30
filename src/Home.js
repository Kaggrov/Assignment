import React, { useEffect, useState } from 'react'
import Header from './Header';
import AddNote from './AddNote';
import Table from './Table';
import './Home.css';

const Home = () => {
    const [input,setInput] = useState("");
    const [desc,setDesc] = useState("");
    const [todo,setTodo] = useState([]);

    const [count, setCount] = useState(0);

    const [originalTodo, setOriginalTodo] = useState([]);

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
            originalTodo = {originalTodo}
            setOriginalTodo = {setOriginalTodo} 
          />
          <Table todo = {todo} setTodo={setTodo} count = {count} setCount = {setCount} originalTodo = {originalTodo}
            setOriginalTodo = {setOriginalTodo} />
      </div>
    </div>
  )
}

export default Home