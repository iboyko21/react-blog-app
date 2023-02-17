import ReactQuill from "react-quill"; // used instead of <textarea> for text editor
import 'react-quill/dist/quill.snow.css'; // styles for text editor
import { useState } from 'react';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content,setContent] = useState('');
    const modules = {
        toolbar: [
            [{ 'header': [1,2,false] }],
            ['bold','italic','underline','strike','blockquote'],
            [{'list':'ordered'}, {'list':'bullet'}, {'indent':""}],
            ['link', 'image'],
            ['clean']
        ]
    };
    const formats = [
        'header',
        'bold','italic','underline','strike','blockquote',
        'list', 'bullet', 'indent',
        'link','image'
    ]

    return (
        <form>
            <input type="title" placeholder='Title' />
            <input type="summary" placeholder='Summary' />
            <input type="file"/>
            <ReactQuill value={content} modules={modules} formats={formats} />
            <button className="createpost">Create Post</button>
        </form>
    );
}