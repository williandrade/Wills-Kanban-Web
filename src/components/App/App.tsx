import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useMst } from "../../stores/Root";
import Header from "../Header/Header";
import Modal from "../Modal/Modal";
import Table from "../Table/Table";

import Lottie from "lottie-react";
import intro from "../../assets/intro-data.json";
import { getCookie, setCookie } from "../../util/Helper";
import { HAVE_SEEN_INTRO_FLAG } from "../../util/Constants";

function App() {
  const { cardStore } = useMst();

  const [isCompleteIntro, setCompleteIntro] = useState(getCookie(HAVE_SEEN_INTRO_FLAG) === "true" ? true : false);

  const handleComplete = () => {
    setCompleteIntro(true);
    setCookie(HAVE_SEEN_INTRO_FLAG, "true");
  };

  return (
    <>
      {!isCompleteIntro ? (
        <div className="hero fullscreen">
          <div className="hero-body">
            <Lottie animationData={intro} loop={false} autoPlay={true} onComplete={handleComplete} />
          </div>
        </div>
      ) : (
        <section className="section h-screen animated fadeIn">
          <div className="hero">
            <div className="hero-body">
              <div className="content">
                <Header />
                <Table />
                {cardStore.createEditModalIsOpen && <Modal card={cardStore.selectedCard} />}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default observer(App);
