import * as React from 'react';
import { ColumnItem } from '../App';

interface AppProps {
  title?: string
  column?: ColumnItem;
}

export const BoardItem: React.FC<AppProps> = ({ column }) => (
  <td style={{ backgroundColor: column.status != 'off' ? column.color: 'white'}}>
      {column.status != 'off' ? '': 'OFF'}
  </td>
)
