import { Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { login as authLogin } from '../../store/authSlice'
import Button from '../Button'
import { useDispatch } from 'react-redux'
import authService from '../../appWrite/Auth/auth.service'
import { Logo } from '../index'
import {useForm} from 'react-hook-form'
import Input from '../input'

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //handleSubmit is keyword event , coming from useForm 
    const {register, handleSubmit } = useForm();
    const [error, setError] = useState("")


    const login = async(data) => {
        // setError to ensure that errors are cleaned before login
        setError("")

        try {
            //This sends credentials to Appwrite
            const session = await authService.login(data)
            //If Appwrite successfully creates session. That is on successful login
            if(session) {
                //fetch logged-in user's details from appwrite
                const userData = await authService.getCurrentUser()
                //Store User in Redux. With Redux: entire app knows user is logged in
                if(userData) {
                    dispatch(authLogin(userData));
                    navigate('/')
                }
            }
        } catch (error) {
            console.log(error);
            setError(error.message)
        }
        finally {
        // dispatch(setLoading(false)); // ADD THIS LINE
    }
    }


  return (
    <div
    className='flex items-center justify-center w-full'>

    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                {/* Important  */}
                <Input 
                label="Email"
                placeholder = "Enter Your Email"
                type="email"

                // This is imp for useForm. it should be for each Input filed
                //If not, then another register fields input gets overwrite, hence we spread it
                {...register("email", {
                    required: true,
                    validate: {matchPatern: (value) =>
                        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
                        "Email address must be a valid address."
                    }
                })}
                />


                <Input
                label="password"
                type="password"
                placeholder="Enter Password"

                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type='submit'
                className='w-full'
                >Sign In</Button>

            </div>

        </form>

    </div>
    </div>
  )
}

export default Login