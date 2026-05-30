import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { RTE } from '../index'
import { databaseService } from "../../appWrite/Auth/database.service"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import Button from '../Button'
import Input from '../input'
import SelectBtn from '../SelectBtn'



const PostForm = ({post}) => {

    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({

        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })

    const navigate = useNavigate()

    //fetching the user data from redux store
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) => {
    //     if(post){

    //         const file = await data.image[0] ? databaseService.uploadFile(data.image[0]) : null

    //         if(file) {
    //             databaseService.deleteFile(post.featuredimage)
    //         }

    //         const dbPost = await databaseService.updatePost(post.$id, {
    //             ...data,
    //             featuredimage: file ? file.$id : undefined,
    //         });
    //         if (dbPost) {
    //             navigate(`/post/${data.slug}`);
    //     }
    // }

        if (post) {
    let featuredImageId = post.featuredimage; // keep existing by default

    // If user selected a new image
    if (data.image && data.image[0]) {
        const file = await databaseService.uploadFile(data.image[0]);
        if (file) {
            // Delete old image after successful upload
            if (post.featuredimage) {
                try {
                    await databaseService.deleteFile(post.featuredimage);
                } catch (err) {
                    console.log("Old image not found or already deleted:", err.message);
                }
            }
            featuredImageId = file.$id;
        }
    }

    // Prepare clean update data – exclude the 'image' field
    const updateData = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        status: data.status,
        featuredimage: featuredImageId,
    };

    const dbPost = await databaseService.updatePost(post.$id, updateData);
    if (dbPost) {
        navigate(`/post/${data.slug}`);
    }
}
        
        else{
            const file = await databaseService.uploadFile(data.image[0]);

            if(file) {
                const fileId =  file.$id
                data.featuredimage = fileId
                const dbPost = await databaseService.createPost({
                    ...data,
                    userid: userData.$id,
                })

                if(dbPost){
                    navigate(`/post/${data.slug}`)
                }
            }
        }
}

//important for interview, here we have to examine title look for any spaces in-between, if exist raplace them with "-".
//Interview Question is how we use this slugTransformation: check useEffect
//Interview Question : If we take a useEffect() and called a method there how can we optimize it ?
    //Answer: Store that method in an variable and in return,  callback .unsubscribe()

const slugTransform = useCallback((value) => {

    if(value && typeof value === 'string'){

        //There are multiple ways we have define slug
        // const slug = value.toLowerCase().replace(/ /g,'-')
        // setValue('slug', slug)
        // return slug

        return value.trim().toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s/g, '-')
    }

    else{
        return ''
    }

}, [])

    useEffect(() => {

        //subscription is made with watch()
        const subscription = watch((value, {name}) => {
            if( name === 'title'){
                //pass the value of slug we created here in slugTransform. to slug.
                setValue('slug', slugTransform(value.title, 
                    { shouldValidate: true }))
            }
        })

        return () => {
            //Memory Management (optimization)
            subscription.unsubscribe()
        }

    }, [watch, slugTransform, setValue])

return (
<form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 cursor-pointer"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={databaseService.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <SelectBtn
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full hover:bg-blue-800 cursor-pointer">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm