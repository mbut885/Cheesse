import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Square from '../../../../main/chess/components/board/Square';
import type { PieceName } from '../../../../main/chess/components/board/BoardConfig';

describe('Square component', () => {
  const defaultProps = {
    id: 'e4' as const,
    position: 'e4',
    piece: undefined,
    isHighlighted: false,
    isSelected: false,
    isDark: false,
    movePiece: jest.fn(),
    onClick: jest.fn(),
    onDrop: jest.fn(),
    onDragOver: jest.fn(),
  };

  it('renders without crashing', () => {
    const { container } = render(React.createElement(Square, { ...defaultProps }));
    expect(container).toBeInTheDocument();
  });

  it('renders a piece if provided', () => {
    // Assuming 'PieceName' is a string union like 'wP', 'bK', etc.
    const props = { ...defaultProps, piece: 'wP' as PieceName };
    const { getByTestId } = render(React.createElement(Square, { ...props }));
    expect(getByTestId('piece')).toBeInTheDocument();
  });

  it('applies highlighted class when isHighlighted is true', () => {
    const props = { ...defaultProps, isHighlighted: true };
    const { container } = render(React.createElement(Square, { ...props }));
    expect(container.firstChild).toHaveClass('highlighted');
  });

  it('applies selected class when isSelected is true', () => {
    const props = { ...defaultProps, isSelected: true };
    const { container } = render(React.createElement(Square, { ...props }));
    expect(container.firstChild).toHaveClass('selected');
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    const props = { ...defaultProps, onClick };
    const { getByTestId } = render(React.createElement(Square, { ...props }));
    fireEvent.click(getByTestId('square'));
    expect(onClick).toHaveBeenCalledWith('e4');
  });

  it('calls onDrop when a piece is dropped', () => {
    const onDrop = jest.fn();
    const props = { ...defaultProps, onDrop };
    const { getByTestId } = render(React.createElement(Square, { ...props }));
    fireEvent.drop(getByTestId('square'));
    expect(onDrop).toHaveBeenCalledWith('e4');
  });

  it('calls onDragOver when a piece is dragged over', () => {
    const onDragOver = jest.fn();
    const props = { ...defaultProps, onDragOver };
    const { getByTestId } = render(React.createElement(Square, { ...props }));
    fireEvent.dragOver(getByTestId('square'));
    expect(onDragOver).toHaveBeenCalledWith('e4');
  });
});