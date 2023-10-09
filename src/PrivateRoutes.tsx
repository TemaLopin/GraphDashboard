import { ReactNode, useEffect } from 'react'
import { Routes, useNavigate } from 'react-router'

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    token ? navigate('/dashboard') : navigate('/login')
  }, [children])

  return <Routes>{children}</Routes>
}

export default PrivateRoute
