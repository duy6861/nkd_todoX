import {Toaster} from "sonner"
import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFound"

function App() {

  return (
    <>
    <Toaster richColors/>
    
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
