import React from 'react';
import { useTypeSelector } from '../hooks/useTypedSelector';
import CellListItem from './CellListItem';

const CellList: React.FC = () => {
  const cells = useTypeSelector(({ cells: { order, data } }) =>
    order.map(id => data[id])
  );
  const renderedCells = cells.map(cell => (
    <CellListItem key={cell.id} cell={cell} />
  ));

  return <>{renderedCells}</>;
};

export default CellList;
