import { useContext, createContext } from "react";
import { types, Instance } from "mobx-state-tree";
import { CardStore } from "./CardStore";
import { TagStore } from "./TagStore";
import { StatusStore } from "./StatusStore";

import StatusData from "../data/Status.json";
import TagsData from "../data/Tags.json";
import CardsData from "../data/Cards.json";

export const RootModel = types.model({
  statusStore: StatusStore,
  tagStore: TagStore,
  cardStore: CardStore,
});

export const rootStore = RootModel.create({
  statusStore: StatusData,
  tagStore: TagsData,
  cardStore: CardsData,
});

export type IRoot = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | IRoot>(null);

export const Provider = RootStoreContext.Provider;

export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
