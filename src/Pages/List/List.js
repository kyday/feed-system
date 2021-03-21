import React, { useState, useEffect } from "react";
import Button from "../../Components/Button/Button";
import FeedList from "./Components/FeedList/FeedList";
import Sponsored from "../List/Components/Sponsored/Sponsored";
import Modal from "../Modal/Modal";
import { LIST_ASC, LIST_DESC, CATEGORY, API, ADS, FILTER } from "../../config";
import "./List.scss";

function List() {
  const [listData, setListData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [adsData, setAdsData] = useState([]);
  const [isAscActive, setIsAscActive] = useState(false);
  const [isDescActive, setIsDescActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState([1, 2, 3]);

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

  const saveModal = async () => {
    switch (isChecked.length) {
      case 3:
        const responseAll = await API.get(LIST_ASC);
        setListData(responseAll.data.data);
        break;

      case 2:
        const responseTwo = await API.get(
          `${FILTER}&category[]=${isChecked[0]}&category[]=${isChecked[1]}`
        );
        setListData(responseTwo.data.data);
        break;

      case 1:
        const responseOne = await API.get(`${FILTER}&category[]=${isChecked}`);
        setListData(responseOne.data.data);
        break;

      default:
        break;
    }
    setIsModalOpen(false);
  };

  const checkedModal = (e, id) => {
    const { checked } = e.target;
    if (checked) {
      setIsChecked([...isChecked, id]);
    } else {
      setIsChecked(isChecked.filter(el => el !== id));
    }
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
            <Modal
              open={isModalOpen}
              close={closeModal}
              save={saveModal}
              header="필터"
            >
              {categoryData?.map(list => {
                return (
                  <React.Fragment key={list.id}>
                    <div className="checkboxGroup">
                      <input
                        type="checkbox"
                        onChange={e => checkedModal(e, list.id)}
                        checked={isChecked.includes(list.id) ? true : false}
                      />
                      <span>{list.name}</span>
                    </div>
                  </React.Fragment>
                );
              })}
            </Modal>
          </article>

          {listData?.map((list, idx) => {
            return (
              <React.Fragment key={list.id}>
                <FeedList
                  id={list.id}
                  title={list.title}
                  contents={list.contents}
                  userId={list.user_id}
                  createdAt={list.created_at}
                  category_id={list.category_id}
                  categoryData={categoryData}
                />
                {idx % 3 === 2 && <Sponsored adsData={adsData[count++]} />}
              </React.Fragment>
            );
          })}
        </section>
      </main>
    </>
  );
}

export default List;
