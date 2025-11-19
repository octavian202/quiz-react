import { useState } from "react"
import StartPage from "./components/StartPage"
import MainPage from "./components/MainPage"

function App() {

  const [page, setPage] = useState('start')


  
  return (
    <main>
      {page === 'start' ? <StartPage startQuiz={() => setPage('main')} /> : <MainPage />}
    </main>
  )
}

export default App
