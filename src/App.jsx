import { useEffect } from "react"
import { useDispatch } from "react-redux";
import authService from "./appWrite/Auth/auth.service";
import {login, logout} from "./store/authSlice"
import { Footer, Header } from "./components/index";
import { Outlet } from "react-router-dom";
import { useState } from "react";


function App() {

  //To handle the delay in datafetch
  const [loading, setLoading] = useState(true);
  // const loading = useSelector((state) => state.auth.loading)
  const dispatch = useDispatch()


  useEffect(()=> {

    // dispatch(setLoading(true))

    authService.getCurrentUser()
    .then((data) => {
      if(data){
        dispatch(login(data))
      } else{
        dispatch(logout())
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(logout())
    })
    .finally(() => setLoading(false))

  }, [dispatch])

    if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-400">
        <div className="text-center">
          <h2 className="text-xl">Loading...</h2>
        </div>
      </div>
    )
  }

    return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  ) 

}

export default App
