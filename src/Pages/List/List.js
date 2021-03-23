import React, { useState, useEffect, useRef } from "react";
import Button from "../../Components/Button/Button";
import FeedList from "./Components/FeedList/FeedList";
import Sponsored from "../List/Components/Sponsored/Sponsored";
import Modal from "../Modal/Modal";
import {
  LIST_ASC,
  LIST_DESC,
  CATEGORY,
  API,
  ADS,
  FILTER_ASC,
  FILTER_DESC,
} from "../../config";
import "./List.scss";

function List() {
  const [listData, setListData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [adsData, setAdsData] = useState([]);
  const [isAscActive, setIsAscActive] = useState(false);
  const [isDescActive, setIsDescActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState([1, 2, 3]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const pageEnd = useRef();

  let count = 0;

  useEffect(() => {
    getListData(pageNumber);
    getCategoryData();
    getAdsData(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        entires => {
          if (entires[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 1 }
      );
      observer.observe(pageEnd.current);
    }
  }, [loading]);

  // infinite scroll
  const loadMore = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  //get Data
  const getListData = async pageNumber => {
    const response = await API.get(`${LIST_ASC}&page=${pageNumber}`);
    setListData(prev => [...prev, ...response.data.data]);
    setLoading(true);
  };

  const getCategoryData = async () => {
    const response = await API.get(CATEGORY);
    setCategoryData(response.data.category);
  };

  const getAdsData = async pageNumber => {
    const response = await API.get(`${ADS}&page=${pageNumber}`);
    setAdsData(prev => [...prev, ...response.data.data]);
  };

  //sort
  const onSortAscending = async () => {
    const response = await API.get(`${LIST_ASC}&page=${pageNumber}`);
    setListData(response.data.data);
    setIsAscActive(!isAscActive);
    setIsDescActive(false);
  };

  const onSortDescending = async () => {
    const response = await API.get(`${LIST_DESC}&page=${pageNumber}`);
    setListData(response.data.data);
    setLoading(true);
    setIsDescActive(!isDescActive);
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

        if (isDescActive === true) {
          const responseDescAll = await API.get(LIST_DESC);
          setListData(responseDescAll.data.data);
        }

        break;

      case 2:
        const responseTwo = await API.get(
          `${FILTER_ASC}&category[]=${isChecked[0]}&category[]=${isChecked[1]}`
        );
        setListData(responseTwo.data.data);

        if (isDescActive === true) {
          const responseTwo = await API.get(
            `${FILTER_DESC}&category[]=${isChecked[0]}&category[]=${isChecked[1]}`
          );
          setListData(responseTwo.data.data);
        }

        break;

      case 1:
        const responseOne = await API.get(
          `${FILTER_ASC}&category[]=${isChecked}`
        );
        setListData(responseOne.data.data);

        if (isDescActive === true) {
          const responseOne = await API.get(
            `${FILTER_DESC}&category[]=${isChecked}`
          );
          setListData(responseOne.data.data);
        }

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
                className={`sortBtn ${isAscActive && "active"}`}
                onClick={() => onSortAscending(pageNumber)}
              />
              <small className={`${isAscActive && "ascActive"}`}>
                오름차순
              </small>
            </span>

            <span className="sortBtnGroup">
              <button
                className={`sortBtn ${isDescActive && "active"}`}
                onClick={() => onSortDescending(pageNumber)}
              />
              <small className={`${isDescActive && "descActive"}`}>
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

          <div className="loading" ref={pageEnd}>
            {loading && "Loading..."}
          </div>
        </section>
      </main>
    </>
  );
}

export default List;
