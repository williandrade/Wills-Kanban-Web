import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { ICardModel } from "../../stores/CardStore";
import Card from "../Card/Card";
import "./Column.scss";

interface Props {
  id: string;
  title: string;
  color?: string;
  cards?: ICardModel[];
}

function Column(props: Props) {
  const { t } = useTranslation();

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    transform: isDragging ? "rotate(5deg)" : "rotate(0deg)",
  });

  return (
    <div className="u-flex u-flex-column h-100p">
      <div className="u-flex u-justify-space-between kanban-column-header u-flex-grow-0" style={{ borderColor: props.color ? props.color : "transparent" }}>
        <div className="col">
          <div className="uppercase title bold">{t(props.title)}</div>
        </div>
        {props.cards && (
          <div className="col-2">
            <div className="tag-container u-center tag-rounded animated bounceIn">
              <div className="tag">{props.cards.length}</div>
            </div>
          </div>
        )}
      </div>
      {props.id && (
        <Droppable droppableId={props.id}>
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="u-flex-grow-1 pt-1">
              {props.cards &&
                props.cards.map((card, index) => (
                  <Draggable key={card._id} draggableId={card._id} index={index}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Card style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)} card={card} />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </div>
  );
}

export default Column;
