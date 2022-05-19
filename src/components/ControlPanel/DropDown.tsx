import * as React from "react";
import { Form } from "react-bootstrap";
import { Switch } from "./Switch";

interface AppProps {
  onSelect?: (string: string) => void;
}

export const DropDown: React.FC<AppProps> = ({ children, onSelect }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onSelect(value);
  };
  return (
    <Form.Select onChange={(event) => handleChange(event as any)}>
      {children}
    </Form.Select>
  );
};
