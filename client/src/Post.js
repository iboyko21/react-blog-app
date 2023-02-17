import {formatISO9075} from 'date-fns'; // date-fns used to format date
// import {format} from 'date-fns'; // can use format function to customize the date/time format

export default function Post({title,summary,file,content,createdAt,author}) {
    return (
        <div className="post">
        <div className="image">
          <img src={'http://localhost:4000/' + file} alt={file}/>
        </div>
        <div className="text">
          <h2>{title}</h2>
          <p className="info">
            <a className="author">{author.username}</a>
            <time>{formatISO9075(new Date(createdAt))}</time>
            {/* <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time> */} 
          </p>
          <p className="summary">{summary}</p>
          <p>{content}</p>
        </div>
      </div>
    );
}




