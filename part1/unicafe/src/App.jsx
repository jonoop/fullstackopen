import { useState } from "react"

const Button = ({onHandle,children})=>{
  return <button style={{margin:"10px 10px"}} onClick={onHandle}>{children}</button>
}

const Statistics = ({text,value})=>{
  return <tr>
  <td>
    {text}</td>
    <td>{value}</td> 
  </tr> 
}

const App = ()=>{
  const [good,setGood] =useState(0)
  const [neutral,setNeutral] =useState(0)
  const [bad,setBad] = useState(0)
  return <div>
    <p style={{fontSize:"28px"}}>give feedback</p>
    <div style={{display:"flex",alignContent:"space-between"}}>
    <Button onHandle={()=>setGood(good + 1)}>good</Button>
    <Button onHandle={()=>setNeutral(neutral + 1)}>neutral</Button>
    <Button onHandle={()=>setBad(bad+1)}>bad</Button>
    </div>
    <table>
      <thead>
<tr>

    <td style={{fontSize:"28px"}}>statistics</td>
</tr>
      </thead>
    {(good || bad || neutral) ?<tbody>
      <Statistics text={"good"} value={good}/>
      <Statistics text={"neutral"} value={neutral}/>
      <Statistics text={"bad"} value={bad}/>
      <Statistics text={"all"} value={good+bad+neutral}/>
      <Statistics text={"average"} value={((good-bad)/(good+bad+neutral)).toFixed(2)}/>
      <Statistics text={"positive"} value={`${(good/(good+bad+neutral)*100).toFixed(2)}%`}/>
    </tbody> : <tbody>
      <tr>
        <td>
      No feedback given
        </td>
      </tr>
      </tbody>}
    </table>
  </div>

}

export default App