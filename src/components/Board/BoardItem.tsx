import * as React from 'react';
import { ColumnItem } from '../App';

interface AppProps {
  title?: string
  column?: ColumnItem;
  itemIndex: number;
  rowIndex: number;
  editCell: (item: ColumnItem, rowIndex: number, itemIndex: number) => void;
}

export const BoardItem: React.FC<AppProps> = ({ column, editCell, rowIndex, itemIndex }) => (
  <td onClick={() => editCell(column, rowIndex, itemIndex)} style={{ backgroundColor: column.status != 'off' ? column.color: 'white'}}>
      {column.status != 'off' ? '': 'OFF'}
  </td>
)
