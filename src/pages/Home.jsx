import { useEffect, useState } from "react"
import { databaseService } from "../appWrite/Auth/database.service"
import { Container, PostCard } from "../components/index"
import { useSelector } from "react-redux"


const Home = () => {

    const [posts, setPosts] = useState([]);

     const [loading, setLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.status)


    useEffect(() => {
        databaseService.getActivePosts().then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
        setLoading(false);
    }, [])

    if(loading){
    return (
    <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
)}

    if(posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                {authStatus ? "No posts available" : "Login to read posts"}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.slug} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )

}

export default Home