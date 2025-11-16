import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function MonButton({onAdd}) {
  return <button onClick={onAdd} className='border bg-black text-white mt-6 p-4'> Test</button>
}




function App() {

  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([])

  function addTodo() {
    setTodos([...todos, inputValue])
  }

  return (
    <div className='flex items-center justify-center flex-col'>
    <h1 className="text-3xl font-bold  text-white"> Welcome to my Todolist </h1>
    <input type='text' value={inputValue} onChange={e => setInputValue(e.target.value)}></input>
    <MonButton onAdd={addTodo}/>
    <p className="text-white">{todos.map(list => <li> {list}</li>)}</p>
    </div>
  )
}

export default App
