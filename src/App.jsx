import { useState, useCallback,useEffect, useRef } from 'react'
import './App.css'

function App() {
const [length, setLength] = useState(8);
const [numAllow, setNumAllow] = useState(true);
const [charAllow, setcharAllow] = useState(true);
const [password ,setPassword ]  = useState('op');

const passwordRef = useRef(null);

const passwordGenerator = useCallback( () => {
let pass='';
let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
if(numAllow){
  str += '0123456789';
} 
if(charAllow){
  str += '!@#$%^&*(){}~`';
}
for(let i = 1 ; i < length ; i++){
  let char = Math.floor(Math.random() * str.length+1)
  pass += str.charAt(char);
}
setPassword(pass);
} 
  ,[length, numAllow, charAllow, setPassword])


const copyPassword = useCallback(() => {
  passwordRef.current?.select();
  // passwordRef.current?.setSelectionRange(0);
window.navigator.clipboard.writeText(password) ;
},[password])


useEffect(() => {passwordGenerator()}, 
[length, numAllow, charAllow, passwordGenerator])
 

  return (
    <>
    <div className='w-full h-screen p-10 bg-slate-900'>
      <h1 className='text-center text-white text-4xl font-bold p-8' >Password Generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg  p-6 text-orange-500 bg-gray-600'>
        <div>
          <div className='flex py-3 '>
            <input type="text" placeholder='password' className='w-full p-4 rounded-l-lg outline-none'  value={password} readOnly ref={passwordRef}/>
          <button type='submit' className='bg-blue-700 p-4 rounded-r-lg  text-white' onClick={copyPassword} >Copy</button>
          </div>
          <div className='flex justify-between '>
          <div> <input type="range" onChange={(e) => setLength(e.target.value)} min={6} max={100} />
          <label>length : {length} </label>
            </div>
            <div>
              <input type="checkbox"  id="numberInput" defaultChecked={numAllow} onChange={() => {
setNumAllow((prev) => !prev)
          }} />
          <label >number</label>
            </div>
          <div>
             <input type="checkbox" id='charInput' defaultChecked={charAllow} onChange={() => {
            setcharAllow((prev) => !prev)
          }} />
           <label >character</label>
          </div>
         
          </div>
          

          
        </div>
      </div>
    </div>
      
    </>
  )
}

export default App
