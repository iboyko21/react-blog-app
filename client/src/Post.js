import { Link } from 'react-router-dom';
import {formatISO9075} from 'date-fns'; // date-fns used to format date
// import {format} from 'date-fns'; // can use format function to manually customize the date/time format

export default function Post({_id,title,summary,file,createdAt,author}) {
    return (
        <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={'http://localhost:4000/' + file} alt={file}/>
          </Link>
        </div>
        <div className="text">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p className="info">
            <a className="author">{author.username}</a>
            <time>{formatISO9075(new Date(createdAt))}</time>
            {/* <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time> */} 
          </p>
          <p className="summary">{summary}</p>
        </div>
      </div>
    );
}




