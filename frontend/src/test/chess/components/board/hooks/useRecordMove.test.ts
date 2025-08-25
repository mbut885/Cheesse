import { renderHook, act } from '@testing-library/react';
import { useRecordMove } from '../../../../../main/chess/components/board/hooks/useRecordMove';
const moveLogStore = require('../../../../../../main/chess/components/history/moveLogStore');

// Mock the useMoveLog hook and its addMove function
jest.mock('../../../../../../main/chess/components/history/moveLogStore', () => ({
  useMoveLog: () => ({
    addMove: jest.fn(),
  }),
}));

describe('useRecordMove', () => {
  let addMoveMock: jest.Mock;

  beforeEach(() => {
    // Reset the mock before each test
    jest.resetModules();
    addMoveMock = moveLogStore.useMoveLog().addMove;
  });

  it('records a pawn move in standard notation', () => {
    const { result } = renderHook(() => useRecordMove());
    act(() => {
      result.current('e2', 'e4', 'pawn_white');
    });
    expect(addMoveMock).toHaveBeenCalledWith('e4');
  });

  it('records a knight move in standard notation', () => {
    const { result } = renderHook(() => useRecordMove());
    act(() => {
      result.current('g1', 'f3', 'knight_white');
    });
    expect(addMoveMock).toHaveBeenCalledWith('Nf3');
  });

  it('records a bishop move in standard notation', () => {
    const { result } = renderHook(() => useRecordMove());
    act(() => {
      result.current('f1', 'c4', 'bishop_white');
    });
    expect(addMoveMock).toHaveBeenCalledWith('Bc4');
  });

  it('records a rook move in standard notation', () => {
    const { result } = renderHook(() => useRecordMove());
    act(() => {
      result.current('a1', 'a3', 'rook_white');
    });
    expect(addMoveMock).toHaveBeenCalledWith('Ra3');
  });

  it('records a queen move in standard notation', () => {
    const { result } = renderHook(() => useRecordMove());
    act(() => {
      result.current('d1', 'h5', 'queen_white');
    });
    expect(addMoveMock).toHaveBeenCalledWith('Qh5');
  });

  it('records a king move in standard notation', () => {
    const { result } = renderHook(() => useRecordMove());
    act(() => {
      result.current('e1', 'e2', 'king_white');
    });
    expect(addMoveMock).toHaveBeenCalledWith('Ke2');
  });

  it('handles unknown piece types as pawn (no symbol)', () => {
    const { result } = renderHook(() => useRecordMove());
    act(() => {
      result.current('a2', 'a3', 'dragon_white');
    });
    expect(addMoveMock).toHaveBeenCalledWith('a3');
  });

  it('splits piece string correctly and ignores color', () => {
    const { result } = renderHook(() => useRecordMove());
    act(() => {
      result.current('b2', 'b4', 'pawn_black');
    });
    expect(addMoveMock).toHaveBeenCalledWith('b4');
  });
});