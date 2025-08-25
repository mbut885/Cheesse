import {
  FILES,
  RANKS,
  type SquareId,
  type PieceName,
  pieceMap,
initialPieces,
} from "../../../../main/chess/components/board/BoardConfig";

describe("BoardConfig", () => {
test("FILES should contain 8 files a-h", () => {
  expect(FILES).toEqual(["a", "b", "c", "d", "e", "f", "g", "h"]);
});

test("RANKS should contain 8 ranks 8-1", () => {
  expect(RANKS).toEqual([8, 7, 6, 5, 4, 3, 2, 1]);
});

test("pieceMap should have all PieceName keys", () => {
  const pieceNames: PieceName[] = [
    "bishop_black", "bishop_white",
    "king_black",   "king_white",
    "knight_black", "knight_white",
    "pawn_black",   "pawn_white",
    "queen_black",  "queen_white",
    "rook_black",   "rook_white",
  ];
  pieceNames.forEach(name => {
    expect(pieceMap).toHaveProperty(name);
    expect(typeof pieceMap[name]).toBe("string");
  });
});

test("initialPieces should have correct white and black piece positions", () => {
  // White pawns
  FILES.forEach(file => {
    const square = `${file}2` as SquareId;
    expect(initialPieces[square]).toBe("pawn_white");
  });
  // Black pawns
  FILES.forEach(file => {
    const square = `${file}7` as SquareId;
    expect(initialPieces[square]).toBe("pawn_black");
  });
  // White back rank
  expect(initialPieces["a1"]).toBe("rook_white");
  expect(initialPieces["b1"]).toBe("knight_white");
  expect(initialPieces["c1"]).toBe("bishop_white");
  expect(initialPieces["d1"]).toBe("queen_white");
  expect(initialPieces["e1"]).toBe("king_white");
  expect(initialPieces["f1"]).toBe("bishop_white");
  expect(initialPieces["g1"]).toBe("knight_white");
  expect(initialPieces["h1"]).toBe("rook_white");
  // Black back rank
  expect(initialPieces["a8"]).toBe("rook_black");
  expect(initialPieces["b8"]).toBe("knight_black");
  expect(initialPieces["c8"]).toBe("bishop_black");
  expect(initialPieces["d8"]).toBe("queen_black");
  expect(initialPieces["e8"]).toBe("king_black");
  expect(initialPieces["f8"]).toBe("bishop_black");
  expect(initialPieces["g8"]).toBe("knight_black");
  expect(initialPieces["h8"]).toBe("rook_black");
});

test("initialPieces should not have pieces on empty squares", () => {
  FILES.forEach(file => {
    for (const rank of [3, 4, 5, 6]) {
      const square = `${file}${rank}` as SquareId;
      expect(initialPieces[square]).toBeUndefined();
    }
  });
});
});