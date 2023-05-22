import React from 'react';
import { useActions } from '../hooks/useActions';
import './AddCell.css';

interface AddCellProps {
  nextCellId: string | null;
  showAlways?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ showAlways, nextCellId }) => {
  const { insertCellBefore } = useActions();
  return (
    <div className={`add-cell ${showAlways && 'show-always'}`}>
      <div className='add-buttons'>
        {' '}
        <button
          className='button is-rounded is-primary is-small'
          onClick={() => insertCellBefore(nextCellId, 'code')}
        >
          <span className='icon is-small'>
            <i className='fas fa-plus'></i> Code
          </span>
        </button>
        <button
          className='button is-rounded is-primary is-small'
          onClick={() => insertCellBefore(nextCellId, 'text')}
        >
          <span className='icon is-small'>
            <i className='fas fa-plus'></i> Text
          </span>
        </button>
      </div>
      <div className='divider'></div>
    </div>
  );
};

export default AddCell;
