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
import * as styles from './botExplorerBar.scss';

import { EndpointExplorerContainer } from '../endpointExplorer';
import { ExplorerBarBody } from '../explorerBarBody';
import { ExplorerBarHeader, Title } from '../explorerBarHeader/explorerBarHeader';
import { TranscriptExplorer } from '../transcriptExplorer';
import { BotNotOpenExplorer } from '../botNotOpenExplorer/botNotOpenExplorer';
import { IBotConfig } from 'msbot/bin/schema';

interface BotExplorerBarProps {
  activeBot: IBotConfig;
  hidden: boolean;
}

export default class BotExplorerBar extends React.Component<BotExplorerBarProps> {
  constructor(props: BotExplorerBarProps) {
    super(props);
  }

  private get activeBotJsx(): JSX.Element {
    return (
      <>
        <EndpointExplorerContainer title="Endpoint"/>
        <TranscriptExplorer/>
      </>
    );
  }

  private get botNotOpenJsx(): JSX.Element {
    return <BotNotOpenExplorer/>;
  }

  render() {
    const className = this.props.hidden ? styles.explorerOffScreen : '';
    const explorerBody = this.props.activeBot ? this.activeBotJsx : this.botNotOpenJsx;
    return (
      <div className={ `${styles.botExplorerBar} ${className}` }>
        <ExplorerBarHeader>
          <Title>
            Bot Explorer
          </Title>
        </ExplorerBarHeader>
        <ExplorerBarBody>
          { explorerBody }
        </ExplorerBarBody>
      </div>
    );
  }
}
