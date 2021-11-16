import React, { ReactElement, useEffect, useState } from "react";
import './AutocompleteRecipients.scss'
import recipientService from "../../services/recipient.service";
import { Recipient } from "../../models/recipient.model";
import { noop } from "../../utils/common-utils";

export interface Props {
  query: string;
  onChoose?: (recipient: Recipient) => void;
}

const AutocompleteRecipients: React.FC<Props> = (
  {
    query,
    onChoose = noop,
  }): ReactElement => {

  const [recipients, setRecipients] = useState<Recipient[]>([]);

  useEffect(() => {
    // TODO: properly fetch asynchronously
    setRecipients(recipientService.fetchRecipients(query));
  }, [query])

  return (
    <div  className={'autocompleteContainer' + (recipients.length ? ' active' : '')}>
      {recipients.length > 5 && <div className="fadeout" data-testid="fadeout" />}
      <div className="autocomplete">
        {recipients.map((recipient, index) =>
          <div data-testid="ac-item" key={index} className="item" onClick={(): void => onChoose(recipient)}>
            {recipient.email}
          </div>
        )}
      </div>
    </div>
  )
}

export default AutocompleteRecipients;
