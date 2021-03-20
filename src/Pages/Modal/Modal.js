import React from "react";
import "../Modal/Modal.scss";

function Modal(props) {
  const { open, close, header, children } = props;

  return (
    <section className={open ? "modal open" : "modal"}>
      {open ? (
        <article className="modalWrapper">
          <header className="modalHeader">
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main className="modalMain">{children}</main>
          <footer>
            <button className="close" onClick={close}>
              저장하기
            </button>
          </footer>
        </article>
      ) : null}
    </section>
  );
}

export default Modal;
