"use client"; // This is a client component 👈🏽


import { useRouter } from 'next/navigation'

//recoil

const FirstPage = () => {
  const router = useRouter()

  return <div style={{
    display:'flex', justifyContent:'center', alignItems:'center',
    height: "100vh", width:'100vw'}}>

    <div style={{display:'flex', 
    alignItems:'center',
    flexDirection:'column'}}>
      <span>Welcome to ChatGPT</span>
      <span style={{marginTop:24,}}>Login with your OpenAI account to continue</span>

      <div style={{display:'flex', flexDirection:'row', marginTop:24,}}>
        <button 
        onClick={e => router.push('/playground')}
        className="p-2 rounded-md mr-2" style={{backgroundColor:"rgb(16, 163, 127)"}}>Log in</button>
        <button className="p-2 rounded-md" style={{backgroundColor:"rgb(16, 163, 127)"}}>Sign up</button>
      </div>
    </div>
  </div>
}

//~ 3:20 작업 
//~ 3:30 쉬는 시간! 

export default FirstPage