import { useEffect, useState } from 'react'
import axios from 'axios'


const App = ()=>{
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [errorMess, setErrorMess] = useState(null)

  useEffect(()=>{
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filter}`).then(res=>{
    const data = res.data.name.official
    setCountries(data)
    }).catch(()=>{
      setErrorMess(`No countries found with filter ${filter}`)
      setTimeout(() => {
        setErrorMess(null)
      }, 2000);
    })
  },[filter])

  return <div>
    Find countries <input onChange={(e)=>setFilter(e.target.value)} value={filter}/>
    <p>{countries}</p>
    {errorMess && <p>{errorMess}</p>}
  </div>
}

export default App