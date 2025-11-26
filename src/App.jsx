import React, { useState } from 'react'
import axios from 'axios'
import Markdown from 'react-markdown'
import Loader from './Loader';

function App() {
  let [question, setQuestion] = useState('');
  let [data, setData] = useState('');
  let [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('https://chatbot-server-wriq.onrender.com/ask', { question })
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          setData(finalRes.finalData)
          setLoading(false);
        }
      })
  }

  return (
    <>
      <div className='w-screen'>
        <h1 className='w-full bg-gray-900 text-white py-4 text-center text-sm sm:text-md md:text-[16px] lg:text-4xl'>CloudTalk</h1>
        <div className='max-w-[1170px] mx-auto grid grid-cols-[30%_auto] gap-5 pt-[30px]'>
          <form className='w-full' onSubmit={handleSubmit}>
            <textarea value={question} onChange={(e) => setQuestion(e.target.value)} name="" id="" placeholder='Hi there! 👋 How can I help you today?' rows={8} className='w-full outline-none border-2 rounded border-gray-500 px-3 py-2 '></textarea>
            <button className='bg-gray-800 rounded w-full py-2 text-white active:scale-95 cursor-pointer'>Generate</button>
          </form>
          <div className='border-l border-[#ccc]'>
            <div className='h-[350px] bg-gray-100 overflow-y-scroll p-3 text-left'>
              {
                loading
                  ?
                  <Loader />
                  :
                  <Markdown>
                    {data}
                  </Markdown>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App