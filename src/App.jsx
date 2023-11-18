import { useState } from 'react'

import Navbar from './components/Navbar';
import Input from './components/Input';
import Output from './components/Output';
import Mic from './components/Mic';
import './App.css'

function App() {

  return (
    <>
        <div className='app'>
          <Navbar />
          <div className='InputOutput'>
            <Input />
            <Output />
          </div>
          <Mic />
        </div>
    </>
  )
}

export default App
