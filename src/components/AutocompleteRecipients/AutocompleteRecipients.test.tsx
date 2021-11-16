import { render, RenderResult, screen } from "@testing-library/react";
import React from 'react';
import AutocompleteRecipients, { Props } from "./AutocompleteRecipients";
import recipientService from "../../services/recipient.service";
import { Recipient } from "../../models/recipient.model";

describe('<AutocompleteRecipients />', (): void => {

  type MocksType = {
    recipients: Recipient[];
  }

  const __MOCKS__: MocksType = {
    recipients: [
      {
        email: 'aa@test'
      },
      {
        email: 'bb@test'
      },
      {
        email: 'cc@test'
      },
      {
        email: 'aa@test'
      },
      {
        email: 'bb@test'
      },
      {
        email: 'cc@test'
      }
    ]
  }

  const renderAutocomplete = (props: Props): RenderResult => {
    return render(<AutocompleteRecipients {...props} />);
  }

  test('Should not render list on empty query', (): void => {
    renderAutocomplete({ query: ''});
    expect(screen.queryAllByTestId('ac-item').length).toEqual(0)
  })

  test('Should display proper elements amount', (): void => {
    // given
    jest.spyOn(recipientService, 'fetchRecipients')
      .mockReturnValue(__MOCKS__.recipients)

    // when
    renderAutocomplete({ query: 'aaa'});

    // then
    expect(screen.queryAllByTestId('ac-item').length).toEqual(__MOCKS__.recipients.length)
  })

  describe('Fadeout element', (): void => {
    test('Fadeout element should be displayed based on elements count', (): void => {
      // given
      jest.spyOn(recipientService, 'fetchRecipients')
        .mockReturnValue(__MOCKS__.recipients)

      // when
      renderAutocomplete({ query: 'aaa'});

      // then
      expect(screen.queryByTestId('fadeout')).toBeTruthy();
    });

    test('Fadeout element should be NOT displayed based on elements count', (): void => {
      // given
      jest.spyOn(recipientService, 'fetchRecipients')
        .mockReturnValue(__MOCKS__.recipients.splice(0, 2))

      // when
      renderAutocomplete({ query: 'aaa'});

      // then
      expect(screen.queryByTestId('fadeout')).toBeNull();
    });
  });
});
