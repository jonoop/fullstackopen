
function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return <div>
    <Header course={course.name}/>
    <Content parts={course.parts}  />
    <Total parts={course.parts}/>
  </div>
}

function Header({course}){
  return <h1>{course}</h1>
}

function Content({parts}){
  return <div>
      {parts.map((part)=>{
        return <Part name={part.name} exercises={part.exercises} key={part.name}/>
      })}
      
  </div>
}

function Part({name, exercises}){
  return <p>{name} {exercises}</p>
}

function Total({parts}){
  return <div>
    <p>Number of exercises {parts.reduce((acc,cur)=>acc + cur.exercises,0)}</p>
  </div>
}

export default App
