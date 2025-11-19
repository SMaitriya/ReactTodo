import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function MonButton({onAdd}) {
  return <button onClick={onAdd} className='border bg-black text-white mt-6 p-4'> Test</button>
}


function App() {

  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  function addTodo() {
    if (inputValue.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: inputValue.trim(), done: false}])
    setInputValue("");
  }

  function editTodo(id) {
    if (editValue.trim() === "") return;
    setTodos(todos.map(todo => todo.id === id ? {...todo, text : editValue.trim()} : todo))
  }

  function ToggleTodo(id) {
    setTodos(todos.map(todo => todo.id === id ? {...todo, done : !todo.done} : todo))

  }

  function removeTodo(id) {
  setTodos(todos.filter(todo => todo.id !== id))
  }

  

  return (
    <div className='flex items-center justify-center flex-col'>
    <h1 className="text-3xl font-bold  text-white"> Welcome to my Todolist </h1>
    <input type='text' value={inputValue} onChange={e => setInputValue(e.target.value)}></input>
    <MonButton onAdd={addTodo}/>
    <ul className="text-white mt-4 ">{todos.map(todo => 
      
    <li className="mt-4 flex items-center" key={todo.id}>
    <span onClick={() => ToggleTodo(todo.id)} className={`w-6 h-6 rounded-full border cursor-pointer ${todo.done ? 'bg-green-800 border-green-800' : 'bg-white border-gray-400'}`}></span>
    {editId === todo.id ? <input type='text' className="text-black" value={editValue} onChange={e => setEditValue(e.target.value)}></input> : (<span className='ml-4'>{todo.text}</span>)}
    
    
    <div className='flex items-center'>
    <button onClick={() => removeTodo(todo.id)} className='ml-6 size-8 border bg-red-900' >X</button> 
    {editId === todo.id ? <button onClick={() => {editTodo(editId); setEditId(null)}}>Save</button> : 
    <span className='ml-4 hover:text-lg cursor-pointer' onClick={() => {setEditId(todo.id); setEditValue(todo.text)}}> Edit</span> }
    </div>
    
    </li> )}</ul>
    </div>
  )
}

export default App
