import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ICardModel } from "../../stores/CardStore";
import { useMst } from "../../stores/Root";

import "./Card.scss";

interface Props {
  card: ICardModel;
  style?: React.CSSProperties | undefined;
}

function Card(props: Props) {
  const { t } = useTranslation();
  const { cardStore, tagStore } = useMst();

  const [isInlineEditing, setInlineEditing] = useState(false);
  const [title, setTile] = useState<string>(props.card.title);

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13 || e.keyCode === 10) {
      handleSubmit();
    }
  };

  const handleClick = (e: any) => {
    if (e.detail === 2) {
      setInlineEditing(true);
    }
  };

  const handleSubmit = () => {
    const card: ICardModel = {
      ...props.card,
      title,
    };

    cardStore.updateCard(card);
    setInlineEditing(false);
  };

  const handleDelete = () => {
    setInlineEditing(false);
    cardStore.deleteCard(props.card);
  };

  const handleCancel = () => {
    setInlineEditing(false);
    setTile(props.card.title);
  };

  const maxDescriptionLength = 100;
  return (
    <div className="card" style={props.style} onClick={handleClick}>
      <div className="content p-2 m-0">
        {isInlineEditing ? (
          <input
            className="fake-input title-edit"
            autoFocus={true}
            type="text"
            placeholder={t("Title")}
            maxLength={20}
            value={title}
            onChange={(e: any) => setTile(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <h6 className="title" onClick={() => setInlineEditing(true)}>
            {props.card.title}
          </h6>
        )}
        {props.card.description && <p>{props.card.description.length > maxDescriptionLength ? props.card.description.substring(0, maxDescriptionLength) + "..." : props.card.description}</p>}
        {props.card.tags.length > 0 && (
          <div className="tag-container">
            {props.card.tags.map((tagId, index) => {
              const tag = tagStore.getById(tagId);

              if (!tag) {
                return <></>;
              }

              return (
                <div key={index} className="tag tag--white" style={{ color: tag.textColor, background: tag.color }}>
                  {t(tag.title)}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="card__action-bar">
        <button className="btn-transparent text-gray-600" onClick={(e: any) => cardStore.openCard(props.card)}>
          <i className="fab fa-solid fa-comments pad-right pr-1"></i>
          {props.card.comments.length}
        </button>
        {isInlineEditing ? (
          <>
            <button className="btn-transparent text-success tooltip" data-tooltip={t("Update Task")} onClick={(e: any) => handleSubmit()}>
              <i className="fab fa-solid fa-check"></i>
            </button>
            <button className="btn-transparent text-danger tooltip" data-tooltip={t("Delete")} onClick={(e: any) => handleDelete()}>
              <i className="fab fa-solid fa-trash"></i>
            </button>
            <button className="btn-transparent text-dark tooltip" data-tooltip={t("Cancel")} onClick={(e: any) => handleCancel()}>
              <i className="fab fa-solid fa-xmark"></i>
            </button>
          </>
        ) : (
          <button className="btn-transparent text-gray-600 tooltip" data-tooltip={t("Edit Task")} onClick={(e: any) => cardStore.openCard(props.card)}>
            <i className="fab fa-solid fa-pen"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default observer(Card);
