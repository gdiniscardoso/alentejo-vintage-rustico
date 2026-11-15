import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import App from "@/App";

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

describe("App routing", () => {
  it("renders the home page for / instead of falling back to not found", () => {
    renderAt("/");

    expect(screen.queryByText("404")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Alentejo Vintage/);
  });

  it.each(["/portfolio", "/feiras", "/sobre", "/encomendar"])("matches %s", (path) => {
    renderAt(path);

    expect(screen.queryByText("404")).not.toBeInTheDocument();
  });

  it("shows not found for unknown paths", () => {
    renderAt("/nope");

    expect(screen.getByText("404")).toBeInTheDocument();
  });
});
