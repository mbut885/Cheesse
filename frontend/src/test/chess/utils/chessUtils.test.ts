import { squareToCoords } from "../../../main/chess/utils/chessUtils";

describe("squareToCoords", () => {
  it("should convert 'a1' to [0, 0]", () => {
    expect(squareToCoords("a1")).toEqual([0, 0]);
  });

  it("should convert 'h8' to [7, 7]", () => {
    expect(squareToCoords("h8")).toEqual([7, 7]);
  });

  it("should convert 'e4' to [4, 3]", () => {
    expect(squareToCoords("e4")).toEqual([4, 3]);
  });

  it("should convert 'b7' to [1, 6]", () => {
    expect(squareToCoords("b7")).toEqual([1, 6]);
  });

  it("should convert 'd2' to [3, 1]", () => {
    expect(squareToCoords("d2")).toEqual([3, 1]);
  });

  it("should handle invalid input gracefully", () => {
    expect(squareToCoords("z9")).toEqual([25, 8]);
  });
});