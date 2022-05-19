import * as React from "react";
import { useRef } from "react";
import { Form } from "react-bootstrap";

interface AppProps {
  title?: string;
  handleClick?: (event: boolean) => void;
}

export const Switch: React.FC<AppProps> = ({ title, handleClick }) => {
  let switchInput = useRef<HTMLInputElement>(null);
  const onClick = () => {
    handleClick(switchInput.current.checked);
  };
  return (
    <>
      <Form.Switch
        ref={switchInput}
        type="switch"
        id="custom-switch"
        label="On | Off"
        onClick={onClick}
      />
    </>
  );
};
