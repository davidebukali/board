import * as React from "react";
import { Button, Form } from "react-bootstrap";
import { ColumnItem } from "../App";
import { DropDown } from "../ControlPanel/DropDown";
import { Switch } from "../ControlPanel/Switch";

interface AppProps {
  title?: string;
  handleSubmit?: (state: ColumnItem) => void;
}

const BoardEditor: React.FC<AppProps> = ({ title, handleSubmit }) => {
    let state: ColumnItem = {
        status: 'off',
        color: '',
    };

    const handleSwitchClick = (clicked: boolean) => {
        state.status = clicked ? 'on' : 'off';
    };

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
        
    // }

    const clickSubmit = () => {
        handleSubmit(state);
    };
  return (
    <Form>
      <h4>{title}</h4>
      <Form.Group className="mb-3">
        <Switch handleClick={handleSwitchClick} />
      </Form.Group>
      <Form.Group className="mb-3">
        <DropDown>
          <option selected>Select Color</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
        </DropDown>
      </Form.Group>
      <Button variant="danger" disabled={title.includes('Add')}>Remove</Button>{" "}
      <Button variant="warning">Cancel</Button>{" "}
      <Button variant="success" onClick={clickSubmit}>{title.includes('Add') ? 'Save' : 'Edit'}</Button>{" "}
    </Form>
  );
};

export { BoardEditor };
