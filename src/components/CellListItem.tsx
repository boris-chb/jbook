import React from 'react';
import { Cell } from '../state';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;

  cell.type === 'code'
    ? (child = <CodeCell cell={cell} />)
    : (child = <TextEditor cell={cell} />);

  return <>{child}</>;
};

export default CellListItem;
