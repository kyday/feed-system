import React, { useState, useEffect } from "react";
import { API, DETAIL } from "../../config";
import "./Detail.scss";

function Detail({ match }) {
  const [detailData, setDetailData] = useState([]);

  useEffect(() => {
    API.get(`${DETAIL}?id=${match.params.id}`).then(res =>
      setDetailData(res.data.data)
    );
  }, [match.params.id]);

  return (
    <section className="detail">
      <article className="detailList">
        <div className="detailGroup">
          <h3 className="detailTitle">{detailData.title}</h3>
          <div className="detailContents">
            <span>{detailData.contents}</span>
          </div>
        </div>

        <div className="createdInfo">
          <p>{detailData.created_at?.substring(0, 10)}</p>
        </div>
      </article>
      <h4 className="replyText">
        답변 <span className="replyCount">{detailData.reply?.length}</span>
      </h4>

      {detailData.reply?.map(list => {
        return (
          <article className="detailList" key={list.id}>
            <div className="replyGroup">
              <h3 className="replyTitle">
                {list.user.name} ({list.user.email})
              </h3>
              <div className="replyContents">
                <span>{list.contents}</span>
              </div>
            </div>
            <div className="createdInfo">
              <p>{list.user.created_at?.substring(0, 10)}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default Detail;
