import * as React from 'react';
import { ColumnItem } from '../../types/boardCells';

interface BoarItemProps {
  column?: ColumnItem;
  itemIndex: number;
  rowIndex: number;
  editCell: (item: ColumnItem, rowIndex: number, itemIndex: number) => void;
}

export const BoardItem: React.FC<BoarItemProps> = ({ column, editCell, rowIndex, itemIndex }) => (
  <td onClick={() => editCell(column, rowIndex, itemIndex)} style={{ backgroundColor: column.status != 'off' ? column.color: 'white'}}>
      {column.status != 'off' ? '': 'OFF'}
  </td>
)
