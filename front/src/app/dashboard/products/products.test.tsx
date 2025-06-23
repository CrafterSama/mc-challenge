import { describe, expect, test, vi } from "vitest";

import { renderWithProviders } from "@/hoc/render-with-providers";
import { screen } from "@testing-library/react";

import ProductsPage from "./page";

const mockOnCancel = vi.fn();
const mockUpdateData = vi.fn();
const mockUpdatePage = vi.fn();

describe("Product Form", () => {
  test("En el encabezado de la página se muestra el título", () => {
    renderWithProviders(<ProductsPage />);
    const title = screen.getAllByText(/Grilla de Frases/i);
    expect(title).toBeDefined();
  });
  test("En el encabezado de la página se muestra la descripción", () => {
    renderWithProviders(<ProductsPage />);
    const description = screen.getAllByText(
      "Crea, Busca/Filtra y Elimina Frases"
    );
    expect(description).toBeDefined();
  });
  test("En la vista se muestra  un input para buscar frases", () => {
    renderWithProviders(<ProductsPage />);
    const searchInput = screen.getByPlaceholderText("Buscar Frases");
    expect(searchInput).toBeInTheDocument();
  });
  test("En la vista se muestra un botón para crear una nueva frase", () => {
    renderWithProviders(<ProductsPage />);
    const createProductButton = screen.getByRole("button", {
      name: "Nueva Frase",
    });
    expect(createProductButton).toBeInTheDocument();
  });
  test("En la vista se muestra la info de que la misma esta vacía", () => {
    renderWithProviders(<ProductsPage />);
    const emptyProductsInfo = screen.getByText("No hay datos disponibles");
    expect(emptyProductsInfo).toBeInTheDocument();
  });
});
