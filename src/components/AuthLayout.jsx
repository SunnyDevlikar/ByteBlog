//it is a mechanism to protect routes and pages
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



export const Protected = ({
    children, authentication = true
}) => {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    //to check if user is logged in or not ?
    const authStatus = useSelector((state) => state.auth.status )

    useEffect(() => {
        
        //Route protection logic
        if(authentication && authStatus !== authentication){
            navigate('/login')
        }else if (!authentication && authStatus !== authentication){
            navigate('/')
        }
        setLoader(false)
        
    }, [authStatus, navigate, authentication])

  return (
    loader ? <h1>Loading...</h1> : <>{children}</>
  )
}







// components/AuthLayout.jsx - WITHOUT loading
// import { useSelector } from 'react-redux'
// import { Navigate } from 'react-router-dom'

// export const Protected = ({ children, authentication = true }) => {
//     const authStatus = useSelector((state) => state.auth.status)

//     // Protected routes (require login)
//     if (authentication && !authStatus) {
//         return <Navigate to="/login" replace />
//     }

//     // Guest-only routes (login/signup pages - redirect if already logged in)
//     if (!authentication && authStatus) {
//         return <Navigate to="/" replace />
//     }

//     return children
// }