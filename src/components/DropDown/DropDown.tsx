import * as React from "react";
import { Form } from "react-bootstrap";
import { Switch } from "../Switch/Switch";

interface DropDownProps {
  onSelect?: (string: string) => void;
  defaultValue?: string;
  testid: string;
}

export const DropDown: React.FC<DropDownProps> = ({ children, defaultValue, onSelect, testid }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onSelect(value);
  };
  return (
    <Form.Select onChange={(event) => handleChange(event as any)} defaultValue={defaultValue ? defaultValue : null} data-testid={testid}>
      {children}
    </Form.Select>
  );
};
