import { useDispatch, useSelector } from 'react-redux'
import { loadUserFromStorage, signInThunk, signUpThunk } from './features/user/userSlice'
import { AppDispatch, RootState } from './store'
import './App.css'
import { useEffect } from 'react'
import api from './api'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state.user)
  console.log('state:', state)

  const handleGetUsers = async () => {
    const res = await api.get('/users')
    console.log('res:', res.data)
  }
  const handleSignIn = async () => {
    dispatch(
      signInThunk({
        username: 'admin',
        password: 'admin'
      })
    )
  }

  const handleSignUp = async () => {
    dispatch(
      signUpThunk({
        username: 'user9',
        password: 'user9'
      })
    )
  }

  useEffect(() => {
    dispatch(loadUserFromStorage())
  }, [])

  return (
    <div className="App">
      <h1>Vite + React + Toolkit + Tailwind</h1>
      <div className="card grid gap-4">
        {state.user && <h2 className="text-lg">Hey, {state.user.username}</h2>}
        <button onClick={handleSignIn}>SignIn</button>
        <button onClick={handleSignUp}>SignUp</button>

        <button onClick={handleGetUsers}>GetUsers</button>
        <button onClick={() => dispatch(loadUserFromStorage())}>Load User</button>
      </div>
    </div>
  )
}

export default App
