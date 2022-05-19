import * as React from "react";
import { DropDown } from "./DropDown";
import { Switch } from "./Switch";

interface AppProps {
  title?: string;
  handleSwitch?: (event: boolean) => void;
  addBulb: () => void;
}

const ControlPanel: React.FC<AppProps> = ({ addBulb, handleSwitch }) => {
  return (
    <div className="container">
      <div className="lead">
        <h4>Control Panel</h4>
      </div>
      <div className="row mb-3">
        <Switch handleClick={handleSwitch} />
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <button type="button" className="btn btn-secondary input-block-level form-control" onClick={addBulb}>
            Add Bulb
          </button>
        </div>
        <div className="col-6">
          <DropDown>
          <option selected>Blink Pattern</option>
          <option value="even">Even</option>
          <option value="random">Random</option>
          </DropDown>
        </div>
      </div>
      <div className="row mb-3">
        <button type="button" className="btn btn-primary">
          Save Config
        </button>
      </div>
    </div>
  );
};

export { ControlPanel };
