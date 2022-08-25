import moment from "moment";
import { Instance, types, getSnapshot, cast, getRoot } from "mobx-state-tree";
import { IRoot } from "./Root";
import { DATE_FORMAT } from "../util/Constants";
import { generateUUID } from "../util/Helper";

export const CardModel = types.model({
  _id: types.identifier,
  title: types.string,
  description: types.maybe(types.string),
  comments: types.array(types.string),
  createdOn: types.maybe(types.string),
  status: types.number,
  tags: types.array(types.number),
});
export type ICardModel = Instance<typeof CardModel>;
export interface ICardCreateModel extends Omit<ICardModel, "_id" | "createdOn"> {}

export const CardStore = types
  .model({
    cards: types.array(CardModel),
    cardsFiltered: types.array(CardModel),
    selectedCard: types.maybe(types.reference(CardModel)),
    searchCriteria: types.maybe(types.string),
    viewArchivedCards: false,
    createEditModalIsOpen: false,
  })
  .views((self) => ({
    getCardsWithFilter: () => {
      if (self.searchCriteria) return self.cardsFiltered;
      return self.cards;
    },
    getById: (id: string) => {
      const filter = self.cards.filter((card) => card._id === id);
      if (filter.length > 0) return filter[0];
      else return null;
    },
  }))
  .views((self) => ({
    getByStatus: (statusId: number) => {
      return self.getCardsWithFilter().filter((each) => each.status === statusId);
    },
  }))
  .actions((self) => ({
    search: (criteria: string) => {
      const root: IRoot = getRoot(self);
      self.searchCriteria = criteria;

      if (criteria.trim() === "") {
        self.cardsFiltered.clear();
        return;
      }

      const filtersId = root.tagStore.filterByTitle(criteria).map((each) => each._id);

      const cards = getSnapshot(self.cards).filter((card) => {
        if (
          (card.title && card.title.toLowerCase().indexOf(criteria.toLowerCase()) > -1) ||
          (card.description && card.description.toLowerCase().indexOf(criteria.toLowerCase()) > -1) ||
          card.tags.some((tagId) => filtersId.includes(tagId))
        )
          return true;
        return false;
      });

      self.cardsFiltered = cast(cards);
    },
    openCard: (card?: ICardModel) => {
      if (card) self.selectedCard = card;
      else self.selectedCard = undefined;
      self.createEditModalIsOpen = true;
    },
    dismissNewEditCard: () => {
      self.selectedCard = undefined;
      self.createEditModalIsOpen = false;
    },
    createCard: (card: ICardCreateModel) => {
      const newCard = CardModel.create({
        ...card,
        createdOn: moment().format(DATE_FORMAT),
        _id: generateUUID(),
      });

      self.cards.push(newCard);

      self.selectedCard = undefined;
      self.createEditModalIsOpen = false;
    },
    updateCard: (card: ICardModel) => {
      const cardIdx = self.cards.findIndex((each) => each._id === card._id);
      self.cards[cardIdx] = card;
      self.createEditModalIsOpen = false;
    },
    deleteCard: (card: ICardModel) => {
      self.selectedCard = undefined;
      self.createEditModalIsOpen = false;
      const cardIdx = self.cards.findIndex((each) => each._id === card._id);
      self.cards.splice(cardIdx, 1);
    },
    moveCard: (cardId: string, statusId: number) => {
      self.cards.forEach((each) => {
        if (each._id === cardId) {
          each.status = statusId;
        }
      });
    },
  }));
