import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const Details = (props) => {
  const { name, id } = useParams();

  const detailedItem = props.detailItem;
  console.log(detailedItem);

  const detailElements = detailedItem.map((detail) => {
    return (
      <div key={id} className="details">
        <div className="details_header">
          <img src={detail.owner.avatar_url} alt="avatar" />
          <div className="detail_info">
            <h2>Repo Name: {name}</h2>
            <h3>Author: {detail.owner.login}</h3>
            {detail.private ? <p>Private</p> : <p>Public</p>}
          </div>
          <div className="details_more_info">
            <h3>
              Repository Generated:{" "}
              {format(new Date(detail.created_at), "MMMM dd yyyy")}
            </h3>
            <h3>
              Language:
              {detail.language}
            </h3>
            <a href={detail.html_url}>View Repo</a>
            <h3>{detail.stargazers_count.toLocaleString()} stars</h3>
            <h3>{detail.watchers_count.toLocaleString()} watchers</h3>
            <h3>{detail.forks.toLocaleString()} forks</h3>
            <ul>
            <h3>Topics:</h3>
                {detail.topics.map((topic, index) => (
                    <li key={index}>
                        {topic}
                    </li>
                ))}
            <h3>Issues: {detail.open_issues.toLocaleString()}</h3>
            </ul>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Link to="/">
        <button>Back ⬅︎</button>{" "}
      </Link>
      <span>
        <h2>ID: {id}</h2>
      </span>
      {detailElements}
    </div>
  );
};

export default Details;
