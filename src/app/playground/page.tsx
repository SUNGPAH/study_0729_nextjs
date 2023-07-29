"use client"; // This is a client component 👈🏽

import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

const PlaygroundPage = () => {
  const [prompt, setPrompt] = useState("")
  const [mode, setMode] = useState("conversation")
  /*
   {
      sessionId: '1092830-10298309-109283091823',
      arr: [
        {
          type: "prompt",
          prompt: "wow impressed...",
        },
        {
          type: "response",
          text: "alskdjfalksdjf"
        }
      ]
    }
  */

  const [list, setList] = useState([
  ])
  
  const [sessionId, setSessionId] = useState("")

  const [arr, setArr] = useState([ 
  ])

  useEffect(() => {
    setSessionId(uuidv4())
  }, [])

  useEffect(() => {
    if(arr.length === 1){
      //add new element to list. 
      //with session id..
      const cpList = [...list]
      const item = cpList.find(obj => obj.sessionId === sessionId)
      if (item) {

      }else {
        setList(prev => ([...prev, {sessionId: sessionId, arr: arr}]))
      }      

    } else if (arr.length > 1) {
      const cpList = [...list]
      const item = cpList.find(obj => obj.sessionId === sessionId)
      item.arr = arr
      setList(cpList)
    }

  }, [arr])
  
  useEffect(() => {

    if (list.length > 0){
      localStorage.setItem('myState', JSON.stringify(list));
      //server call to save this cache into real database.!!
    }

  }, [list])

  useEffect(() => {
    //initially load everything from stored cache.
    const storedState = JSON.parse(localStorage.getItem('myState'));
    setList(storedState)
  }, [])

  const submit = async () => {
    setMode('conversation') //initial -> conversation
    setArr(prev => ([...prev, { type: "prompt", prompt: prompt }]))
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
      setArr(prev => ([...prev, { type: "result", text: message }]))
    } catch (error) {
      console.error('Error sending message:', error);
      //alert(!)
    }
  }

  const loadConversation = (obj) => {
    console.log(obj.arr)
    //sessionId
    setSessionId(obj.sessionId)
    setArr(obj.arr)
  }

  return <div className="flex bg-gray h-screen">
    <div className="w-[260px] bg-red-300 overflow-scroll">
      <br/>
      {
        list.map((obj,index) => {
          return <div className="mt-4" onClick={e => loadConversation(obj)}>
            {obj.arr[0].prompt}
            ({obj.arr.length})
          </div>
        })
      }

    </div>
    <div className="flex-1 ">
      <div style={{}} className="bg-black h-full relative">

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
          <div className="flex flex-col">
            {
              arr.map((obj, index) => {
                if (obj.type === "prompt") {
                  return <div className="bg-gray-600 p-4  " key={index} >
                    <div className="m-auto relative pb-4 max-w-[800px] min-w-[600px]">
                      {obj.prompt}
                      <div className="absolute left-[-40px]  top-0 w-[32px] h-[32px] 
                      flex items-center justify-center
                    rounded-md bg-purple-500"
                      >S</div>
                    </div>
                  </div>
                } else {
                  return <div className="bg-gray-800 p-4" key={index}>
                    <div className="m-auto relative pb-4 max-w-[800px] min-w-[600px]">
                    {obj.text}
                    <div className="absolute left-[-40px]  top-0 w-[32px] h-[32px] 
                      flex items-center justify-center
                    rounded-md bg-green-500"
                      >G</div>
                    </div>
                  </div>
                }
              })
            }
          </div>
        }

        <div className="absolute left-0 bottom-[20px] w-full">
          <div className="flex p-4 rounded-lg relative"
            style={{ border: '1px solid gray', maxWidth:800, margin:'auto' }}>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              style={{ height: 30 }}
              placeholder="type here"
              className="resize-none bg-transparent w-full   focus:outline-none" ></textarea>

            <button
              onClick={submit}
              className={`absolute right-[16px] rounded-md top-[12px] w-[32px] h-[32px]
              transition-all ease-in-out duration-500
              ${prompt.trim() === '' ? '' : 'bg-green-500 w-[60px]'
                }
              `}
            >s</button>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default PlaygroundPage