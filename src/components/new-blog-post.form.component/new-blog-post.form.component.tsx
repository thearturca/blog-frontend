import { FormEvent, useState } from "react";

interface NewBlogPostFormComponentProps
{
    handleNewPost(body: string): Promise<void>;
    bodyStartText?: string;
}

function NewBlogPostFormComponent(props: NewBlogPostFormComponentProps) 
{
    const [newBlogPostState, setNewBlogPostState] = useState<string>(props.bodyStartText || "");

    const onSubmit = async (e:FormEvent) =>
    {
        e.preventDefault();
        props.handleNewPost(newBlogPostState);
        setNewBlogPostState("");
    }

    return (
        <>
        <form onSubmit={ onSubmit }>
            <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewBlogPostState(e.target.value)} value={ newBlogPostState }></textarea>
            <input type="submit" value="submit"></input>
        </form>
        </>
    )
}

export default NewBlogPostFormComponent