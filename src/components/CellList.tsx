import React, { Fragment } from 'react';
import { useTypeSelector } from '../hooks/useTypedSelector';
import AddCell from './AddCell';
import CellListItem from './CellListItem';

const CellList: React.FC = () => {
  const cells = useTypeSelector(({ cells: { order, data } }) =>
    order.map(id => data[id])
  );
  const renderedCells = cells.map(cell => (
    <Fragment key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </Fragment>
  ));

  return (
    <>
      {renderedCells}
      <AddCell showAlways={cells.length === 0} nextCellId={null} />
    </>
  );
};

export default CellList;
