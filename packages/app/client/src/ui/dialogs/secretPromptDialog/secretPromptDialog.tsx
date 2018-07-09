//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.
//
// Microsoft Bot Framework: http://botframework.com
//
// Bot Framework Emulator Github:
// https://github.com/Microsoft/BotFramwork-Emulator
//
// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

import * as React from 'react';
import * as styles from './secretPromptDialog.scss';

import {
  Column,
  MediumHeader,
  Row,
  RowJustification,
  SmallHeader,
} from '@bfemulator/ui-react';
import { PrimaryButton, DefaultButton, TextField } from '@bfemulator/ui-react';
import { DialogService } from '../service';

interface SecretPromptDialogState {
  secret: string;
}

export class SecretPromptDialog extends React.Component<{}, SecretPromptDialogState> {
  constructor(props: {}, context: SecretPromptDialogState) {
    super(props, context);

    this.state = { secret: '' };
  }

  render(): JSX.Element {
    return (
      <div className={ styles.secretPromptDialog }>
        <Column>
          <MediumHeader>Bot secret required!</MediumHeader>
          <SmallHeader>Please enter your bot's secret</SmallHeader>
          <TextField
            value={ this.state.secret }
            onChanged={ this.onChangeSecret }
            label={ 'Bot secret' }
            type={ 'password' }/>
          <Row className={styles.buttonRow} justify={ RowJustification.Right }>
            <DefaultButton text={ 'Dismiss' } onClick={ this.onClickDismiss }/>
            <PrimaryButton className={styles.saveButton} text={ 'Save' } onClick={ this.onClickSave }/>
          </Row>
        </Column>
      </div>
    );
  }

  private onClickDismiss = () => {
    DialogService.hideDialog(null);
  }

  private onClickSave = () => {
    // return the secret
    DialogService.hideDialog(this.state.secret);
  }

  private onChangeSecret = (secret) => {
    this.setState({ secret });
  }
}
