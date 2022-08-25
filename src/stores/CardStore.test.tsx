import { CardStore } from "./CardStore";
import { RootModel } from "./Root";

import StatusData from "../data/Status.json";
import TagsData from "../data/Tags.json";
import CardsData from "../data/Cards.json";
import { cast } from "mobx-state-tree";

test("Get All Cards", () => {
  const cardStore = CardStore.create(CardsData);
  expect(cardStore.getCardsWithFilter()).toHaveLength(2);
});

test("Get All Cards By Status", () => {
  const cardStore = CardStore.create(CardsData);
  expect(cardStore.getByStatus(0)).toHaveLength(1);
});

test("Card by Id [1016fa7b-c47d-4b29-a9da-d8e20922ac11]", () => {
  const cardStore = CardStore.create(CardsData);
  expect(cardStore.getById("1016fa7b-c47d-4b29-a9da-d8e20922ac11")).toStrictEqual({
    comments: ["First Comment", "Second Comment"],
    description: "Here is a description",
    status: 0,
    tags: [0, 1],
    title: "A new Task",
    createdOn: "2022-08-24",
    _id: "1016fa7b-c47d-4b29-a9da-d8e20922ac11",
  });
});

test("Get All Cards After Search", () => {
  const rootStore = RootModel.create({
    statusStore: StatusData,
    tagStore: TagsData,
    cardStore: CardsData,
  });

  const cardStore = rootStore.cardStore;
  cardStore.search("Completed");

  const filter = cardStore.getCardsWithFilter();

  expect(filter).toHaveLength(1);
  expect(filter[0].title).toContain("Completed");
});

test("Open one Card", () => {
  const cardStore = CardStore.create(CardsData);

  const card = cardStore.getById("1016fa7b-c47d-4b29-a9da-d8e20922ac11");
  cardStore.openCard(card!);
  const selectedCard = cardStore.selectedCard;

  expect(selectedCard).toBeDefined();
  expect(selectedCard!._id).toContain("1016fa7b-c47d-4b29-a9da-d8e20922ac11");
  expect(cardStore.createEditModalIsOpen).toBe(true);
});

test("Dismiss New/Edit Card", () => {
  const cardStore = CardStore.create(CardsData);

  const card = cardStore.getById("1016fa7b-c47d-4b29-a9da-d8e20922ac11");
  cardStore.openCard(card!);

  cardStore.dismissNewEditCard();

  expect(cardStore.selectedCard).toBeUndefined();
  expect(cardStore.createEditModalIsOpen).toBe(false);
});

test("Create Card", () => {
  const cardStore = CardStore.create();

  cardStore.createCard({
    comments: cast(["First Comment", "Second Comment"]),
    description: "Here is a description",
    status: 0,
    tags: cast([0, 1]),
    title: "A new Task",
  });

  expect(cardStore.getCardsWithFilter()).toHaveLength(1);
});

test("Update Card", () => {
  const cardStore = CardStore.create(CardsData);

  const card = cardStore.getById("1016fa7b-c47d-4b29-a9da-d8e20922ac11");
  cardStore.updateCard({ ...card!, status: 2 });

  const updatedCard = cardStore.getById("1016fa7b-c47d-4b29-a9da-d8e20922ac11");

  expect(updatedCard!.status).toBe(2);
});

test("Delete Card", () => {
  const cardStore = CardStore.create(CardsData);

  const card = cardStore.getById("1016fa7b-c47d-4b29-a9da-d8e20922ac11");
  expect(card).toBeDefined();

  cardStore.deleteCard(card!);
  const deletedCard = cardStore.getById("1016fa7b-c47d-4b29-a9da-d8e20922ac11");

  expect(deletedCard).toBeNull();
});

test("Move Card", () => {
  const cardStore = CardStore.create(CardsData);

  cardStore.moveCard("1016fa7b-c47d-4b29-a9da-d8e20922ac11", 2);

  const card = cardStore.getById("1016fa7b-c47d-4b29-a9da-d8e20922ac11");

  expect(card!.status).toBe(2);
});
