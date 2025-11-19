import { renderWithRouter } from "@/utils/test-utils";
import { fireEvent, screen } from "@testing-library/react";

describe("Given Home Page", () => {
  describe("When browse products button is clicked", () => {
    test("Then page navigates to /products", () => {
      const { memoryRouter } = renderWithRouter("/");

      const button = screen.getByTestId("browse-products");

      fireEvent.click(button);

      expect(memoryRouter.state.location.pathname).toBe("/products");
    });
  });
});
