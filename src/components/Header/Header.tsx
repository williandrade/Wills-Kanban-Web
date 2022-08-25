import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMst } from "../../stores/Root";

function Header() {
  const { t } = useTranslation();
  const { cardStore } = useMst();
  const [searchInputValue, setSearchInputValue] = useState("");

  return (
    <div className="row">
      <div className="col-xs-12 col-md-4">
        <h5 className="title">
          Will's <small className="font-thin">Kanban</small>
        </h5>
      </div>
      <div className="col-8">
        <div className="u-flex u-flex-column-reverse u-gap-1 u-flex-row-reverse-md">
          <div className="level-item">
            <input
              type="search"
              placeholder={t("Search") + "..."}
              value={searchInputValue}
              onChange={(e) => {
                const val = e.target.value;
                setSearchInputValue(val);
                cardStore.search(val);
              }}
            />
          </div>
          <button onClick={(e) => cardStore.openCard()}>
            <i className="fa-wrapper fa fa-plus pad-right"></i>
            {t("New Task")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default observer(Header);
