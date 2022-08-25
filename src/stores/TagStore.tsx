import { Instance, types } from "mobx-state-tree";

export const TagModel = types.model({
  _id: types.number,
  title: types.string,
  color: types.string,
  textColor: types.string,
});
export type ITagModel = Instance<typeof TagModel>;

export const TagStore = types
  .model({
    tags: types.array(TagModel),
  })
  .views((self) => ({
    getAll: () => {
      return self.tags;
    },
    getById: (id: number) => {
      const filter = self.tags.filter((tag) => tag._id === id);
      if (filter.length > 0) return filter[0];
      else return null;
    },
    filterByTitle: (title: string) => {
      const filter = self.tags.filter((tag) => tag.title.toLowerCase().indexOf(title.toLowerCase()) > -1);
      return filter;
    },
  }));
