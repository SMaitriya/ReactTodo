import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function MonButton({onAdd}) {
  return <button onClick={onAdd} className='hover:bg-white hover:text-black border bg-black border-black text-white ml-6 px-4'> +</button>
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

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (editId !== null) {
        editTodo(editId);
        setEditId(null);
        setEditValue("");
        return
      }
      addTodo();
    }
  }

  function editTodo(id) {
    if (editValue.trim() === "") return;
    setTodos(todos.map(todo => todo.id === id ? {...todo, text: editValue.trim()} : todo))
  }

  function ToggleTodo(id) {
    setTodos(todos.map(todo => todo.id === id ? {...todo, done: !todo.done} : todo))

  }

  function removeTodo(id) {
  setTodos(todos.filter(todo => todo.id !== id))
  }

  

  return (
    <div className='flex justify-center'>
      <div className='flex items-center justify-center flex-col border p-8  bg-gray-900'>
    <h1 className="text-3xl font-bold  text-white mb-8"> Todolist </h1>
    <div className='flex justify-center w-full'>
      <input className="rounded-full  p-2" type='text' value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown}></input>
    <MonButton onAdd={addTodo}/>
    </div>
    
    <ul className="text-white mt-4 ">{todos.map(todo => 
      
    <li className="mt-4 flex items-center" key={todo.id}>
    <span onClick={() => ToggleTodo(todo.id)} className={`w-6 h-6 rounded-full border cursor-pointer ${todo.done ? 'bg-green-800 border-green-800' : 'bg-white border-gray-400'}`}></span>
    {editId === todo.id ? <input type='text' onKeyDown={handleKeyDown} className="text-black rounded-full ml-2 p-1 w-40" value={editValue} onChange={e => setEditValue(e.target.value)}></input> : (<span className='ml-4 w-40'>{todo.text}</span>)}
    
    
    <div className='flex items-center '>
    <button onClick={() => removeTodo(todo.id)} className='ml-6 flex  px-1  bg-red-900' >x</button> 
    {editId === todo.id ? <button className="ml-4"  onClick={() => {editTodo(editId); setEditId(null)}}>Save</button> : 
    <span className='ml-4 hover:text-black cursor-pointer' onClick={() => {setEditId(todo.id); setEditValue(todo.text)}}> Edit</span> }
    </div>
    
    </li> )}</ul>
    </div>

    </div>
    
  )
}

export default App
