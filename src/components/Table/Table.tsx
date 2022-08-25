import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { observer } from "mobx-react-lite";
import { useMst } from "../../stores/Root";
import Column from "../Column/Column";

function Table() {
  const { cardStore, statusStore } = useMst();

  const onDragEnd = (result: any) => {
    if (result.destination && result.destination.droppableId) {
      cardStore.moveCard(result.draggableId, Number(result.destination.droppableId));
    }
    return;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-100p u-overflow-scroll h-screen p-1">
        <div className="u-flex u-flex-nowrap u-gap-2 min-w-md h-100p">
          {statusStore.getAll().map((status, index) => (
            <div key={index} className="u-flex-grow-1 w-0 min-w-300px">
              <Column id={status._id.toString()} title={status.title} color={status.color} cards={cardStore.getByStatus(status._id)} />
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}

export default observer(Table);
