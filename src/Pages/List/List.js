import React, { useState, useEffect } from "react";
import Button from "../../Components/Button/Button";
import FeedList from "./Components/FeedList/FeedList";
import Sponsored from "../List/Components/Sponsored/Sponsored";
import Modal from "../Modal/Modal";
import { LIST_ASC, LIST_DESC, CATEGORY, API, ADS } from "../../config";
import "./List.scss";

function List() {
  const [listData, setListData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [adsData, setAdsData] = useState([]);
  const [isAscActive, setIsAscActive] = useState(false);
  const [isDescActive, setIsDescActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let count = 0;

  useEffect(() => {
    getListData();
    getCategoryData();
    getAdsData();
  }, []);

  //get Data
  const getListData = async () => {
    const response = await API.get(LIST_ASC);
    setListData(response.data.data);
  };

  const getCategoryData = async () => {
    const response = await API.get(CATEGORY);
    setCategoryData(response.data.category);
  };

  const getAdsData = async () => {
    const response = await API.get(ADS);
    setAdsData(response.data.data);
  };

  //sort
  const onSortAscending = () => {
    API.get(LIST_ASC).then(res => setListData(res.data.data));
    setIsAscActive(!isAscActive);
    localStorage.removeItem("isDescActive");
    localStorage.setItem("isAscActive", !isAscActive);
    setIsDescActive(false);
  };

  const onSortDescending = () => {
    API.get(LIST_DESC).then(res => setListData(res.data.data));
    setIsDescActive(!isDescActive);
    localStorage.removeItem("isAscActive");
    localStorage.setItem("isDescActive", !isDescActive);
    setIsAscActive(false);
  };

  //modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <main>
        <Button />
        <section className="containerGroup">
          <article className="sortContainer">
            <span className="sortBtnGroup">
              <button
                className={`sortBtn ${
                  localStorage.getItem("isAscActive") ? "active" : ""
                }`}
                onClick={onSortAscending}
              />
              <small
                className={
                  localStorage.getItem("isAscActive") ? "ascActive" : null
                }
              >
                오름차순
              </small>
            </span>

            <span className="sortBtnGroup">
              <button
                className={`sortBtn ${
                  localStorage.getItem("isDescActive") ? "active" : ""
                }`}
                onClick={onSortDescending}
              />
              <small
                className={
                  localStorage.getItem("isDescActive") ? "descActive" : null
                }
              >
                내림차순
              </small>
            </span>

            <button className="filterBtn" onClick={openModal}>
              <span>필터</span>
            </button>
            <Modal open={isModalOpen} close={closeModal} header="필터">
              {categoryData?.map(list => {
                return (
                  <React.Fragment key={list.id}>
                    <div className="checkboxGroup">
                      <input type="checkbox" />
                      <span>{list.name}</span>
                    </div>
                  </React.Fragment>
                );
              })}
            </Modal>
          </article>

          {listData?.map((list, idx) => {
            return idx % 4 === 3 ? (
              <Sponsored key={list.id} adsData={adsData[count++]} />
            ) : (
              <FeedList
                key={list.id}
                id={list.id}
                title={list.title}
                contents={list.contents}
                userId={list.user_id}
                createdAt={list.created_at}
                category_id={list.category_id}
                categoryData={categoryData}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}

export default List;
