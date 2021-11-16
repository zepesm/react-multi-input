import React, { ReactElement } from "react";
import './Chip.scss'
import { noop } from "../../utils/common-utils";

export interface Props {
  isInvalid?: boolean
  onDelete?: () => void;
}

const Chip: React.FC<Props> = (
  {
    children,
    onDelete = noop,
    isInvalid = false
  }): ReactElement => {

  return (
    <div className={`chip ${isInvalid ? 'invalid': ''}`} onClick={onDelete} title={children as string}>
      {children}
      <span className="remove">x</span>
      {isInvalid && <span className="exclamation">!</span>}
    </div>
  )
}

export default Chip;
