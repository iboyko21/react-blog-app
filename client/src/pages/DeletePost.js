import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

export default function DeletePost() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    // const [summary, setSummary] = useState('');
    const [content,setContent] = useState('');
    const [file,setFile] = useState('');
    const [redirect,setRedirect] = useState(false);
    const [cancel,setCancel] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/post/'+ id)
        .then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setFile(postInfo.file);
            });
        });
    }, []);

    async function deletePost() {
        const response = await fetch('http://localhost:4000/post/' + id, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (response.ok){
            setRedirect(true);
        }
    }

    function cancelDelete() {
        setCancel(true);
    }

    if (cancel) {
        return <Navigate to={'/post/' + id}/>
    }
    if (redirect) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className="delete">
            <div className="confirm">
                Are you sure you want to delete this post?<br/>
                <button className="btn-yes" onClick={deletePost}>Yes</button>
                <button className="btn-no" onClick={cancelDelete}>No</button>
            </div>
            <h1>{title}</h1>
            <div className="image">
                <img src={`http://localhost:4000/${file}`} alt=""/>
            </div>
            <p dangerouslySetInnerHTML={{__html: content}} />
        </div>
    );
}