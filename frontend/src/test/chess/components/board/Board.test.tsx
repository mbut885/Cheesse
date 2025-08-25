import { render, screen } from "@testing-library/react";
import Board from "../../../../main/chess/components/board/Board";

// Mock dependencies
jest.mock("../../../main/chess/components/board/Square", () => (props: any) => (
  <div data-testid="square" data-id={props.id} data-dark={props.isDark}>
    {props.piece && <span data-testid="piece">{props.piece}</span>}
  </div>
));

jest.mock(
  "../../../main/chess/components/board/hooks/useMovePiece",
  () => ({
    useMovePiece: () => ({
      pieces: {
        a1: "rook",
        b1: "knight",
        c1: null,
        d1: null,
        e1: null,
        f1: null,
        g1: null,
        h1: "rook",
        // ...mock other squares as needed
      },
      movePiece: jest.fn(),
    }),
  })
);

describe("Board", () => {
  it("renders the chessboard with 64 squares", () => {
    render(<Board />);
    const squares = screen.getAllByTestId("square");
    expect(squares).toHaveLength(64);
  });

  it("renders pieces on the correct squares", () => {
    render(<Board />);
    expect(screen.getAllByTestId("square").find(el => el.getAttribute("data-id") === "a1")).toHaveTextContent("rook");
    expect(screen.getAllByTestId("square").find(el => el.getAttribute("data-id") === "b1")).toHaveTextContent("knight");
    expect(screen.getAllByTestId("square").find(el => el.getAttribute("data-id") === "c1")).not.toHaveTextContent("rook");
  });

  it("applies correct dark/light square coloring", () => {
    render(<Board />);
    // a1 is (0,0) => light, b1 is (1,0) => dark
    expect(screen.getAllByTestId("square").find(el => el.getAttribute("data-id") === "a1")).toHaveAttribute("data-dark", "false");
    expect(screen.getAllByTestId("square").find(el => el.getAttribute("data-id") === "b1")).toHaveAttribute("data-dark", "true");
  });
});