import { ReactElement } from "react";

import ChakraProviders from "@/providers/chakra-provider";
import { RenderOptions, render } from "@testing-library/react";

const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) =>
  render(ui, {
    wrapper: ({ children }) => <ChakraProviders>{children}</ChakraProviders>,
    ...options,
  });

export * from "@testing-library/react";
export { renderWithProviders };
