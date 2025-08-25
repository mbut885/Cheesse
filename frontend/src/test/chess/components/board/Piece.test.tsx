import React from "react";
import { render } from "@testing-library/react";
import Piece, { ItemTypes } from "../../../../main/chess/components/board/Piece";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Mock useDrag from react-dnd
jest.mock("react-dnd", () => {
  const original = jest.requireActual("react-dnd");
  return {
    ...original,
    useDrag: jest.fn(() => [{ isDragging: false }, jest.fn()]),
  };
});

describe("Piece component", () => {
  const id = "wP1";
  const src = "/pieces/wP.png";

  function renderWithDnd(ui: React.ReactElement) {
    return render(<DndProvider backend={HTML5Backend}>{ui}</DndProvider>);
  }

  it("renders the image with correct src and alt", () => {
    const { getByAltText } = renderWithDnd(<Piece id={id} src={src} />);
    const img = getByAltText(id) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(src);
    expect(img.alt).toBe(id);
  });

  it("has the correct className and style", () => {
    const { getByAltText } = renderWithDnd(<Piece id={id} src={src} />);
    const img = getByAltText(id);
    expect(img).toHaveClass("piece");
    expect(img).toHaveStyle({ opacity: "1", cursor: "grab" });
  });

  it("sets draggable to false", () => {
    const { getByAltText } = renderWithDnd(<Piece id={id} src={src} />);
    const img = getByAltText(id);
    expect(img).toHaveAttribute("draggable", "false");
  });

  it("uses ItemTypes.PIECE as drag type", () => {
    expect(ItemTypes.PIECE).toBe("piece");
  });

  it("changes opacity when isDragging is true", () => {
    // Override mock to simulate dragging
    (require("react-dnd").useDrag as jest.Mock).mockReturnValueOnce([{ isDragging: true }, jest.fn()]);
    const { getByAltText } = renderWithDnd(<Piece id={id} src={src} />);
    const img = getByAltText(id);
    expect(img).toHaveStyle({ opacity: "0.5" });
  });
});