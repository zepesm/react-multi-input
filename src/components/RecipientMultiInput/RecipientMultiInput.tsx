import React, { ReactElement, useEffect, useState } from "react";
import "./RecipientMultiInput.scss";
import Chip from "../Chip/Chip";
import { Recipient } from "../../models/recipient.model";
import AutocompleteRecipients from "../AutocompleteRecipients/AutocompleteRecipients";
import { noop } from "../../utils/common-utils";

export interface Props {
  onChange?: (recipients: Recipient[]) => void;
}

const RecipientMultiInput: React.FC<Props> = (
  {
    onChange = noop
  }): ReactElement => {

  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [currentRecipient, setCurrentRecipient] = useState<Recipient>({ email: "" });

  // just for parent debug purposes
  useEffect((): void => {
    onChange(recipients);
  }, [recipients, onChange]);

  const addRecipientAndClearInput = (recipient: Recipient): void => {
    if (!recipient?.email?.length) {
      return;
    }

    setRecipients(currentRecipients => [...currentRecipients, recipient]);
    setCurrentRecipient({ email: "" });
  };

  const onInputChange = (event): void => {
    setCurrentRecipient({ email: event.target.value });
  };

  const removeRecipientByIndex = (index: number): void => {
    setRecipients(currentRecipients => currentRecipients.filter((el, i) => i !== index));
  };

  const onInputKeyDown = (event): void => {
    const recipientEmail: string = event.target.value;

    if (event.code === "Enter") {
      if (recipientEmail?.length) {
        addRecipientAndClearInput({ email: recipientEmail });

      }
    } else if (event.code === "Backspace") {
      if (!recipientEmail.length && recipients.length) {
        setRecipients(currentRecipients => currentRecipients.slice(0, -1));
      }
    }
  };

  return (
    <>
      <div className="emailInput">
        {recipients.map((el, index) =>
          <div className="chipItem" key={index}>
            <Chip
              isInvalid={el.id === undefined}
              onDelete={(): void => removeRecipientByIndex(index)}>{el.email}
            </Chip>
          </div>)}

        <div className="inputContainer">
          <input
            value={currentRecipient?.email}
            onChange={onInputChange}
            onKeyDown={onInputKeyDown}
            /*          onBlur={(): void => {
                        addRecipient(currentRecipient);
                        setCurrentRecipient({ email: "" });
                      }}*/
            placeholder="Enter recipients..."
          />
        </div>
      </div>
      <div className="autocompleteContainer">
        <AutocompleteRecipients query={currentRecipient.email} onChoose={addRecipientAndClearInput}/>
      </div>
    </>
  );
};

export default RecipientMultiInput;
