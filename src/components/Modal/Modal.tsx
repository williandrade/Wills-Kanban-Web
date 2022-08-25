import React, { useEffect, useRef, useState } from "react";
import { ICardCreateModel, ICardModel } from "../../stores/CardStore";
import { Controller, useForm } from "react-hook-form";
import { ITagModel } from "../../stores/TagStore";
import StatusSelect from "./StatusSelect/StatusSelect";
import TagSelect from "./TagSelect/TagSelect";

import { useMst } from "../../stores/Root";

import "./Modal.scss";
import { cast } from "mobx-state-tree";
import { useTranslation } from "react-i18next";

interface Props {
  card?: ICardModel;
}

function Modal(props: Props) {
  const commentsRef = useRef<null | HTMLDivElement>(null);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const { t } = useTranslation();
  const { cardStore, statusStore, tagStore } = useMst();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (props.card) {
      const status = statusStore.getById(props.card.status);
      const tags = props.card.tags.map((each) => tagStore.getById(each));
      reset({ title: props.card.title, description: props.card.description, status: status, tags: tags });
      setComments(props.card.comments);
    } else {
      reset();
      setComments([]);
    }
  }, []);

  useEffect(() => {
    const el = commentsRef.current;
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      el.scroll({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [comments]);

  const handleKeyDown = (e: any) => {
    if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13 || e.keyCode === 10)) {
      handleAddComment();
    }
  };

  const handleAddComment = (e?: any) => {
    if (comment.trim().length > 0) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  const onSubmit = (data: any) => {
    if (props.card) updateCard(data);
    else createCard(data);
  };

  const updateCard = (data: any) => {
    const card: ICardModel = {
      ...props.card!,
      comments: cast(comments),
      description: data.description,
      status: data.status._id,
      tags: data.tags.map((each: ITagModel) => each._id),
      title: data.title,
    };

    cardStore.updateCard(card);
  };

  const createCard = (data: any) => {
    let card: ICardCreateModel = {
      comments: cast(comments),
      description: data.description,
      status: data.status._id,
      tags: data.tags.map((each: ITagModel) => each._id),
      title: data.title,
    };

    cardStore.createCard(card);
  };

  return (
    <div className="modal-container">
      <div className="modal u-center-alt u-round-lg h-80p">
        <div className="modal-body u-round-lg h-100p u-flex u-flex-column">
          <div className="row bg-gray-100 u-flex-grow-0">
            <div className="col"></div>
            <div className="col-4 u-text-right">
              {props.card ? (
                <>
                  <button className="btn-danger btn--sm m-0" type="button" onClick={() => cardStore.deleteCard(props.card!)}>
                    {t("Delete")}
                  </button>
                  <button className="btn-success btn--sm m-0 ml-1" type="button" onClick={handleSubmit(onSubmit)}>
                    {t("Update Task")}
                  </button>
                </>
              ) : (
                <button className="btn-info btn--sm m-0 ml-1" type="button" onClick={handleSubmit(onSubmit)}>
                  {t("Create Task")}
                </button>
              )}
              <button className="btn--sm m-0 ml-1" type="button" onClick={() => cardStore.dismissNewEditCard()}>
                {t("Close")}
              </button>
            </div>
          </div>
          <div className="row p-0 bt--color u-flex-grow-1">
            <div className="col-6 br--color">
              <div className="row bb--color">
                <div className="col-6 u-text-left mt-1">
                  <Controller name="status" control={control} rules={{ required: true }} render={({ field }) => <StatusSelect {...field} options={statusStore.getAll()} placeholder={t("Status")} />} />
                </div>
                <div className="col-6 mt-1">
                  <Controller name="tags" control={control} render={({ field }) => <TagSelect {...field} options={tagStore.getAll()} placeholder={t("Tags")} />} />
                </div>
              </div>
              <div className="row u-gap-1">
                <div className="col-12 u-text-left">
                  <input className="fake-input" type="text" placeholder={t("Title")} {...register("title", { required: true, maxLength: 20 })} />
                  {errors.title?.type === "maxLength" && <span className="info u-text-center">Ups! Max length here is 20 characters</span>}
                </div>
                <div className="col-12 u-text-left">
                  <textarea className="fake-input" placeholder={t("Description") + "..."} {...register("description", {})}></textarea>
                </div>
              </div>
            </div>
            <div className="col-6 bg-gray-100 u-flex u-flex-column min-h-500px">
              <div ref={commentsRef} className="comment-area u-flex-grow-1 h-0 u-overflow-auto">
                <div className="u-gap-2 p-2">
                  {comments.map((comment, index) => (
                    <div key={index} className="card p-1">
                      <div className="content">
                        <p>{comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="row u-flex-grow-0">
                <div className="col-12">
                  <div className="form-group">
                    <textarea className="form-group-input" placeholder={t("Comment") + "..."} value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={handleKeyDown}></textarea>
                    <button className="form-group-btn" type="button" onClick={handleAddComment}>
                      {t("Add Comment")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
