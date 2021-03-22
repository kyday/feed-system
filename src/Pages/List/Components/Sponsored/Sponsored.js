import React from "react";
import "../Sponsored/Sponsored.scss";

function Sponsored(props) {
  const { adsData } = props;
  console.log(adsData);

  return (
    <article className="adsList">
      <div className="adsTitle">
        <span>sponsored</span>
      </div>

      <div className="adsContentsGroup">
        <img
          alt="testImg"
          src={`https://cdn.comento.kr/assignment/${adsData?.img}`}
        />
        <div className="adsContents">
          <h3>{adsData?.title}</h3>
          <p>{adsData?.contents}</p>
        </div>
      </div>
    </article>
  );
}

export default Sponsored;
