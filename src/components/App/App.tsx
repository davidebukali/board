import * as React from 'react';
import '../app.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Board} from '../Board/Board';
import {ControlPanel} from '../ControlPanel';
import { useState } from 'react';
import { BoardEditor } from '../Board/BoardEditor';
import { Card } from 'react-bootstrap';

export interface ColumnItem {
    status: 'on' | 'off';
    color: string;
}

export interface CellItem {
    columns: ColumnItem[];
}

export const App: React.FC = () => {
    const [cells, setCells] = useState<CellItem[]>([{columns: [
        {
            status: 'on',
            color: 'red',
        },
        {
            status: 'on',
            color: 'green',
        },
    ] }]);
    const [addEditBulb, setAddEditBulb] = useState<'add' | 'edit' | ''>('');
    const maxRow = 3;
    const maxColumn = 3;

    const addColumnItem = () => {
        // if (cells.length){

        // } else {

        // }
        setCells([{columns: [
            {
                status: 'off',
                color: 'red',
            }
        ] }]);
    }

    const onOff = (event: boolean) => {
        setCells(cells.map((cell) => {
            cell.columns.map((column) => {
                column.status = event ? 'on' : 'off';
                return  column;
            })
            return cell;
        }));
    };

    const addBulb = () => {
        setAddEditBulb('add');
    };

    return (
        <div className="app-container">
            <div className="lead"><h1>Board Game</h1></div>
            <div className="table-container">
            <Card style={{ width: '100%', height: '100%'}}>
                <Card.Body>
                { addEditBulb === '' ? <Board cells={cells}/> : <BoardEditor title={addEditBulb === 'edit' ? 'Edit Bulb' : 'Add Bulb'} />}
                </Card.Body>
                </Card>
                </div>
            <div className="container mt-2">
                <ControlPanel handleSwitch={onOff} addBulb={addBulb} />
            </div>
        </div>
    );
}
