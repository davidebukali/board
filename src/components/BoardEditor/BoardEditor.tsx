import * as React from "react";
import { Button, Form } from "react-bootstrap";
import { ActiveColumnItem, ColumnItem } from "../../types/boardCells";
import { DropDown } from "../DropDown";
import { Switch } from "../Switch";

interface BoardEditorProps {
  title?: string;
  activeCell?: ActiveColumnItem;
  handleSubmit: (state: ActiveColumnItem, submit?: boolean) => void;
  handleRemove: (state: ActiveColumnItem) => void;
}

const BoardEditor: React.FC<BoardEditorProps> = ({
  activeCell,
  title,
  handleRemove,
  handleSubmit,
}) => {
  let state: ColumnItem = {
    status: activeCell.item.status,
    color: activeCell.item.color,
  };

  const handleSwitchClick = (clicked: boolean) => {
    state.status = clicked ? "on" : "off";
  };

  const clickSubmit = () => {
    handleSubmit(
      {
        ...activeCell,
        item: state,
      },
      true
    );
  };

  const clickRemove = () => {
    handleRemove(activeCell);
  };
  return (
    <Form>
      <h4>{title}</h4>
      <Form.Group className="mb-3">
        <Switch
          handleClick={handleSwitchClick}
          checked={activeCell.item.status}
          testid={"single-switch"}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <DropDown
          onSelect={(data) => (state.color = data)}
          defaultValue={activeCell.item.color}
          testid={"cell-color"}
        >
          <option defaultValue={"Select Color"}>Select Color</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
        </DropDown>
      </Form.Group>
      <Button variant="danger" disabled={title.includes("Add")} onClick={clickRemove} data-testid="remove-cell">
        Remove
      </Button>{" "}
      <Button variant="warning" onClick={() => handleSubmit(activeCell, false)}>
        Cancel
      </Button>{" "}
      <Button variant="success" onClick={clickSubmit} data-testid="save-board">
        {title.includes("Add") ? "Save" : "Edit"}
      </Button>{" "}
    </Form>
  );
};

export { BoardEditor };
