import { FormEvent, useState } from "react";

interface UpdateBlogPostFormComponentProps
{
    handleUpdatePost(body: string): Promise<void>;
    bodyStartText?: string;
}

function UpdateBlogPostFormComponent(props: UpdateBlogPostFormComponentProps) 
{
    const [newBlogPostState, setNewBlogPostState] = useState<string>(props.bodyStartText || "");

    const onSubmit = async (e:FormEvent) =>
    {
        e.preventDefault();
        props.handleUpdatePost(newBlogPostState);
        setNewBlogPostState("");
    }
    return (
        <>
        <form onSubmit={ onSubmit } className="new-post">
            <div>
                <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewBlogPostState(e.target.value)} value={ newBlogPostState }></textarea>
            </div>
            <input type="submit" value="submit" className="btn"></input>
        </form>
        </>
    )
}

export default UpdateBlogPostFormComponent