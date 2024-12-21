import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ChakraProvider } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import AddMealModal from "../AddMealModal";
import { t } from "i18next";

const mockStore = configureStore([]);
const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useAppDispatch: () => mockDispatch,
}));

describe("AddMealModal Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      mealsDetails: { loading: false, currentPage: 1, filters: {} },
      personalDetails: { details: { plan: "basic" } },
    });
  });

  const renderWithProvider = (ui: React.ReactNode) =>
    render(
      <Provider store={store}>
        <ChakraProvider>{ui}</ChakraProvider>
      </Provider>,
    );

  it("renders the modal when isOpenModal is true", () => {
    renderWithProvider(<AddMealModal isOpenModal={true} onClose={jest.fn()} />);

    expect(
      screen.getByRole("button", { name: /addNewDish/i }),
    ).toBeInTheDocument();
  });

  it("closes the modal when the close button is clicked", async () => {
    const handleClose = jest.fn();

    renderWithProvider(
      <AddMealModal isOpenModal={true} onClose={handleClose} />,
    );

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("displays validation errors when submitting an empty form", async () => {
    renderWithProvider(<AddMealModal isOpenModal={true} onClose={jest.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: /addNewDish/i }));

    expect(await screen.findByText(/noIngredients/i)).toBeInTheDocument();
    expect(await screen.findByText(/noCategory/i)).toBeInTheDocument();
  });

  it("allows filling out the form and submitting", async () => {
    renderWithProvider(<AddMealModal isOpenModal={true} onClose={jest.fn()} />);

    // Fill out the form
    userEvent.type(screen.getByLabelText(/title/i), "Test Meal");
    userEvent.type(
      screen.getByLabelText(/description/i),
      "A test meal description",
    );

    // Simulate selecting a category
    fireEvent.click(screen.getByText(t("mealCategory")));
    fireEvent.click(screen.getByText(/Breakfast/i));

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: t("addNewDish") }));

    // Mock dispatch is called
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });
  });

  it("integrates with child components correctly", async () => {
    renderWithProvider(<AddMealModal isOpenModal={true} onClose={jest.fn()} />);

    fireEvent.click(screen.getByText(/findIngredientFromDatabase/i));
    expect(
      screen.getByRole("heading", { name: /searchIngredientFromDatabase/i }),
    ).toBeInTheDocument();
  });
});
