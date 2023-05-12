import * as crud from "../module/crud-operations.js";
import * as interaction from "../module/interaction.js";

jest.mock("../module/crud-operations.js");
jest.mock("../module/interaction.js");

describe("test add and remove functions", () => {
  test("lenght should be equal to 1", () => {
    // Arrange
    const newtask = {
      index: crud.getData().length + 1,
      description: "Do something",
      completed: true,
    };
    crud.addTodo(newtask);

    // Act
    const storedData = crud.getData();

    // Assert
    expect(storedData.length).toBe(1);
  });

  test("should remove one element fom the array", () => {
    // Arrange
    crud.deleteTodo(1);

    // Act
    const storedData = crud.getData();

    // Assert
    expect(storedData.length).toBe(0);
  });
});

describe("test update and check functions", () => {
  test("should update the description", () => {
    // Arrange
    const newtask = {
      index: crud.getData().length + 1,
      description: "Do something",
      completed: true,
    };
    crud.addTodo(newtask);

    crud.updateTodo(1, "something updated");

    //Act
    const storedData = crud.getData();

    //Assert
    expect(storedData[0].description).toBe("something updated");
  });

  test("should check complete status", () => {
    // Arrange
    const newtask = {
      index: crud.getData().length + 1,
      description: "Do something",
      completed: false,
    };
    crud.addTodo(newtask);

    //Act
    interaction.check(1);
    const storedData = crud.getData();

    //Assert
    expect(storedData[0].completed).toBe(true);
  });
});
