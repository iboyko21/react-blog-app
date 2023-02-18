import ReactQuill from "react-quill"; // used instead of <textarea> for text editor
import 'react-quill/dist/quill.snow.css'; // styles for text editor

export default function Editor({value,onChange}) {
    const modules = {
        toolbar: [
            [{ 'header': [1,2,false] }],
            ['bold','italic','underline','strike','blockquote'],
            [{'list':'ordered'}, {'list':'bullet'}, {'indent':""}],
            ['link', 'image'],
            ['clean']
        ]
    };

    return (
        <ReactQuill 
                    value={value} 
                    onChange={onChange} 
                    modules={modules} />
    );
}