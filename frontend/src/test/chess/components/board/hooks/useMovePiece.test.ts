import { renderHook, act } from "@testing-library/react";
import { useMovePiece } from "../../../../../main/chess/components/board/hooks/useMovePiece";
import { initialPieces } from "../../../../../main/chess/components/board/BoardConfig";
const Referee = require("../../../../main/chess/components/referee/Referee");

// Mock Referee to always allow moves unless specified
jest.mock("../../../../main/chess/components/referee/Referee", () => {
  return jest.fn().mockImplementation(() => ({
    setMoveCount: jest.fn(),
    isValidMove: jest.fn(() => true),
  }));
});

// Mock useRecordMove
jest.mock(
  "../../../../main/chess/components/board/hooks/useRecordMove",
  () => ({
    useRecordMove: () => jest.fn(),
  })
);

describe("useMovePiece", () => {
  it("should initialize with initial pieces", () => {
    const { result } = renderHook(() => useMovePiece());
    expect(result.current.pieces).toEqual(initialPieces);
  });

  it("should move a piece from one square to another", () => {
    const { result } = renderHook(() => useMovePiece());
    const from = "e2";
    const to = "e4";
    const piece = result.current.pieces[from];

    act(() => {
      result.current.movePiece(from, to);
    });

    expect(result.current.pieces[to]).toBe(piece);
    expect(result.current.pieces[from]).toBeUndefined();
  });

  it("should not move if from and to are the same", () => {
    const { result } = renderHook(() => useMovePiece());
    const from = "e2";
    const before = { ...result.current.pieces };

    act(() => {
      result.current.movePiece(from, from);
    });

    expect(result.current.pieces).toEqual(before);
  });

  it("should not move if there is no piece at from square", () => {
    const { result } = renderHook(() => useMovePiece());
    const from = "e3"; // empty in initial position
    const to = "e4";
    const before = { ...result.current.pieces };

    act(() => {
      result.current.movePiece(from, to);
    });

    expect(result.current.pieces).toEqual(before);
  });

  it("should not move if referee says move is invalid", () => {
    // Override isValidMove to return false
    Referee.mockImplementation(() => ({
      setMoveCount: jest.fn(),
      isValidMove: jest.fn(() => false),
    }));

    const { result } = renderHook(() => useMovePiece());
    const from = "e2";
    const to = "e4";
    const before = { ...result.current.pieces };

    act(() => {
      result.current.movePiece(from, to);
    });

    expect(result.current.pieces).toEqual(before);
  });
});