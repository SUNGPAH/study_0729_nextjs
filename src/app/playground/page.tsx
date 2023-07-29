"use client"; // This is a client component 👈🏽

import { useState, useEffect } from 'react'

const PlaygroundPage = () => {
  const [prompt, setPrompt] = useState("")

  const [mode, setMode] = useState("initial")
  const [arr, setArr] = useState([
  ])

  const submit = async () => {
    setMode('conversation')

    setArr(prev => ([...prev, {type: "prompt", prompt: prompt} ]))

    setPrompt("")

    try {
      const apiResponse = await fetch('/api/first-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const { message } = await apiResponse.json();
      setArr(prev => ([...prev, {type: "result", text: message} ]))
    } catch (error) {
      console.error('Error sending message:', error);
    }

  }


  return <div className="flex bg-gray h-screen">
    <div className="w-[260px] bg-red-300">
      list
    </div>
    <div className="flex-1 ">
      <div style={{ minWidth: 600, maxWidth: 800, margin: 'auto' }} className="bg-black h-full relative">

        {mode === "initial" &&
          <div className="flex flex-col pt-4" style={{ alignItems: 'center', }}>
            <h1 className="text-[36px]">chat gpt</h1>
            <div className="flex flex-row w-full mt-4">
              <div className="flex-1 flex flex-col items-center">
                <span>Example</span>
                <div className="bg-gray-500 p-2 rounded-md mt-4">
                  hello I have a sore throat.
                  hello I have a sore throat.
                </div>
                <div className="bg-gray-500 p-2 rounded-md mt-2">
                  hello I have a sore throat.
                  hello I have a sore throat.
                </div>
                <div className="bg-gray-500 p-2 rounded-md mt-2">
                  hello I have a sore throat.
                  hello I have a sore throat.
                </div>
              </div>
            </div>
          </div>
        }

        {mode === "conversation" &&
        <div className="flex flex-col bg-red-300">
          {
            arr.map((obj, index) => {
              if (obj.type === "prompt") {
                return <div className="bg-black-300 p-4" key={index}>
                  {obj.prompt}
              </div>

              }else {
                return <div className="bg-gray-800 p-4" key={index}>
                  {obj.text}
              </div>
              }
            })
          }
        </div>
        }

        <div className="flex absolute left-0 bottom-[20px] w-full p-4 rounded-lg"
          style={{ border: '1px solid gray' }}>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            style={{ height: 30 }}
            placeholder="type here"
            className="resize-none bg-transparent w-full   focus:outline-none" ></textarea>

          <button
            onClick={submit}
            className="absolute right-[16px] rounded-md top-[12px] w-[32px] h-[32px]"
            style={{ backgroundColor: "#28b496" }}>s</button>
        </div>
      </div>
    </div>
  </div>
}

export default PlaygroundPage