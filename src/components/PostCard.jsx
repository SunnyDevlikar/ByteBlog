import { databaseService} from '../appWrite/Auth/database.service'
import {Link} from 'react-router-dom'


const PostCard = (
    {
        slug, 
        title,
        featuredimage
    }
) => {


return (
    <Link to={`/post/${slug}`}>
        <div className='w-full bg-gray-100 rounded-xl, p-4  shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col '>
            { featuredimage && (
            <div className='mb-4 w-full h-48 flex justify-center items-center bg-gray-200 rounded-xl'>
                <img src={databaseService.getFilePreview(featuredimage)} alt={title}  className='max-w-full max-h-full object-cover rounded-xl'/>
            </div>)}
            <h2
            className='text-xl font-bold w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
            >{title}</h2>
        </div>
    </Link>
)

}

export default PostCard