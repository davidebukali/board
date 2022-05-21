import * as React from "react";
import { useRef } from "react";
import { Form } from "react-bootstrap";

interface AppProps {
  title?: string;
  checked?: 'on' | 'off';
  testid: string;
  handleClick?: (event: boolean) => void;
}

export const Switch: React.FC<AppProps> = ({ checked, title, testid, handleClick }) => {
  let switchInput = useRef<HTMLInputElement>(null);
  const onClick = () => {
    handleClick(switchInput.current.checked);
  };
  return (
    <>
      <Form.Switch
        ref={switchInput}
        defaultChecked={checked === 'on'}
        type="switch"
        id="custom-switch"
        label="On | Off"
        onClick={onClick}
        data-testid={testid}
      />
    </>
  );
};
