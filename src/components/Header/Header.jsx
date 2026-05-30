import { Logo,} from "./../index"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import {Container} from '../Container/Container.jsx'
import {LogoutBtn} from './LogoutBtn.jsx'




const Header = () => {

  //redux useSelector(): to check if authenticated user 
  const authStatus = useSelector((state) => state.auth.status)

  const Navigate = useNavigate()

  //whenever such navigation is created it's items are stored inside an array for looping,  Arrays stores objects , becuase if not for each value new  button needs to attached.

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex"> 
          <div className="mr-4 ">
          <Link to={'/'} >
          <Logo width='50px'></Logo>
            </Link>
            </div>
            <ul className="flex ml-auto">
            {navItems.map((item) => 
            item.active ? 
            <li key={item.name}>
              <button
              onClick={() => Navigate(item.slug)}
              className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full font-bold"
              >
                {item.name}
              </button>
            </li> : null
            )}

{/* //If Authenticated then show logoutBtn else not */}
            {
              authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )
            }
            </ul>
        </nav>
      </Container>
    </header>
  )
}

export  {Header}