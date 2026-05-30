import { databaseService } from "../appWrite/Auth/database.service"
import { PostCard , Container} from "../components/index"
import { useState, useEffect } from "react"


const AllPost = () => {

        const [posts, setPosts] = useState([]);

        useEffect(() => {
            databaseService.getPost([])
            .then((post) => {
                if(post) {
                    setPosts(post.documents)
                }
            })
        }, [])
            


return (
    <div className="w-full py-8">
        <Container>
            <div className="flex flex-wrap">
                {
                posts.map((post) => (
                    <div key={post.slug} className="p-2 w-1/4">
                        <PostCard  {...post}/>
                        </div>
                ))
            }
            </div>
        </Container>
    </div>
)
}

export default AllPost