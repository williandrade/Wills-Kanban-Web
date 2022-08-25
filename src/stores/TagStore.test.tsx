import { TagStore } from "./TagStore";
import TagsData from "../data/Tags.json";

test("Get All Tags", () => {
  const tagStore = TagStore.create(TagsData);
  expect(tagStore.getAll()).toHaveLength(4);
});

test("Tag by Id 0", () => {
  const tagStore = TagStore.create(TagsData);
  expect(tagStore.getById(0)).toStrictEqual({
    _id: 0,
    title: "Research",
    color: "#f7f0ff",
    textColor: "#c796ff",
  });
});

test("Tag with Title Research", () => {
  const tagStore = TagStore.create(TagsData);
  const filter = tagStore.filterByTitle("Research");
  
  expect(filter).toHaveLength(1);
  expect(filter[0]).toStrictEqual({
    _id: 0,
    title: "Research",
    color: "#f7f0ff",
    textColor: "#c796ff",
  });
});
