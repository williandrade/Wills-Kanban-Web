import { StatusStore } from "./StatusStore";
import StatusData from "../data/Status.json";

test("Get All Status", () => {
  const statusStore = StatusStore.create(StatusData);
  expect(statusStore.getAll()).toHaveLength(4);
});

test("Status by Id 0", () => {
  const statusStore = StatusStore.create(StatusData);
  expect(statusStore.getById(0)).toStrictEqual({
    _id: 0,
    title: "To Do",
    color: "#3d4656",
  });
});
