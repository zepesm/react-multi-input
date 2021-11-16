import { Recipient } from "../models/recipient.model";

import Recipients from '../mocks/recipients.mock.json';

class RecipientService {
  fetchRecipients(query = ''): Recipient[] {
    // TODO: would be properly implemented on backend side
    const MAX_ITEMS = 100;
    const items = query.length ? Recipients.filter(el => el.email.includes(query)) : [];

    return items.slice(0, MAX_ITEMS);
  }
}

const recipientService = new RecipientService();
export default recipientService;
