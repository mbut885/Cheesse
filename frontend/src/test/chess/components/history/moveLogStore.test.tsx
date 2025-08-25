import { renderHook, act } from '@testing-library/react';
import { useMoveLog } from '../../../../main/chess/components/history/moveLogStore';

describe('useMoveLogStore', () => {
  it('should initialize with an empty move log', () => {
    const { result } = renderHook(() => useMoveLog());
    expect(result.current.moves).toEqual([]);
  });

  it('should add a move to the log', () => {
    const { result } = renderHook(() => useMoveLog());
    act(() => {
      result.current.addMove('e2e4');
    });
    expect(result.current.moves).toEqual(['e2e4']);
  });

  it('should clear the move log', () => {
    const { result } = renderHook(() => useMoveLog());
    act(() => {
      result.current.addMove('e2e4');
    });
    expect(result.current.moves).toEqual([]);
  });
});