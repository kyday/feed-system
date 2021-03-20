import React from "react";
import { useHistory } from "react-router-dom";
import "./FeedList.scss";

function FeedList(props) {
  const {
    category_id,
    id,
    title,
    contents,
    userId,
    createdAt,
    categoryData,
  } = props;

  const history = useHistory();
  const filterData = categoryData.filter(list => list.id === category_id);

  const onDetailClicked = () => {
    history.push(`/detail/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <article className="feedList" onClick={onDetailClicked}>
        <div className="category">
          <span>{filterData[0]?.name}</span>
          <span>{id}</span>
        </div>
        <div className="userInfo">
          <span>{userId}</span>
          <p>{createdAt.substr(0, 10)}</p>
        </div>
        <h3 className="feedTitle">{title}</h3>
        <div className="feedContents">
          <span>{contents}</span>
        </div>
      </article>
    </>
  );
}

export default FeedList;
