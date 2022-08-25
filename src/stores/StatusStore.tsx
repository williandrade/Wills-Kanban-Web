import { Instance, types } from "mobx-state-tree";

export const StatusModel = types.model({
  _id: types.number,
  title: types.string,
  color: types.string,
});
export type IStatusModel = Instance<typeof StatusModel>;

export const StatusStore = types
  .model({
    statuses: types.array(StatusModel),
  })
  .views((self) => ({
    getAll: () => {
      return self.statuses;
    },
    getById: (id: number) => {
      const filter = self.statuses.filter((status) => status._id === id);
      if (filter.length > 0) return filter[0];
      else return null;
    },
  }));
