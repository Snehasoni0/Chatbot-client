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
      <div className="w-screen min-h-screen bg-white">
        <h1 className="w-full bg-gray-900 text-white py-4 text-center 
                 text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold">
          CloudTalk
        </h1>

        <div className="max-w-[1170px] mx-auto px-4 
                  grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">

          <form className="w-full" onSubmit={handleSubmit}>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Hi there! 👋 How can I help you today?"
              rows={8}
              className="w-full outline-none border-2 rounded border-gray-500 px-3 py-2
                   text-sm sm:text-base"
            ></textarea>

            <button className="bg-gray-800 rounded w-full py-2 mt-3 text-white 
                         active:scale-95 cursor-pointer text-sm sm:text-base">
              Generate
            </button>
          </form>

          <div className="md:border-l border-gray-300">
            <div className="h-[300px] sm:h-[350px] md:h-[380px] lg:h-[420px] 
                      bg-gray-100 overflow-y-scroll p-3 rounded text-left text-sm sm:text-base">

              {loading ? (
                <Loader />
              ) : (
                <Markdown>
                  {data}
                </Markdown>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App