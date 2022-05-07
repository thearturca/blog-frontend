import { FormEvent, useRef, useState } from "react";

interface NewBlogPostFormComponentProps
{
    handleNewPost(body: string, formData: FormData): Promise<void>;
    bodyStartText?: string;
}

function NewBlogPostFormComponent(props: NewBlogPostFormComponentProps) 
{
    const [newBlogPostState, setNewBlogPostState] = useState<string>(props.bodyStartText || "");
    const [file, setFile] = useState<File | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = async (e:FormEvent) =>
    {
        e.preventDefault();
        const formData = new FormData();
        if (file !== null)
        {
            formData.append("file", file!, file?.name);
        }
        props.handleNewPost(newBlogPostState, formData);
        setNewBlogPostState("");
        setFile(null);
        formRef.current?.reset();
    }
    return (
        <>
        <form onSubmit={ onSubmit } className="new-post" ref={formRef}>
            <div>
                <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewBlogPostState(e.target.value)} value={ newBlogPostState }></textarea>
            </div>
            <div>
                <input type="file" style={{margin: "20px 0"}} onChange={(e) => setFile(e.target.files![0])}/>
            </div>
            <input type="submit" value="submit" className="btn"></input>
        </form>
        </>
    )
}

export default NewBlogPostFormComponent