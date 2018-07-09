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
import { css } from 'glamor';

import { EndpointExplorerContainer } from './endpointExplorer';
import { ExplorerBarBody } from './explorerBarBody';
import { ExplorerBarHeader, Title } from './explorerBarHeader';
import { FileExplorer } from './fileExplorer';
import { BotNotOpenExplorer } from './botNotOpenExplorer';
import { IBotConfig } from 'msbot/bin/schema';

const CSS = css({
  height: '100%',
  width: '100%',

  '&.explorer-offscreen': {
    position: 'absolute',
    top: '5000px',
    display: 'none'
  }
});

interface BotExplorerBarProps {
  activeBot: IBotConfig;
  hidden: boolean;
}

export default class BotExplorerBar extends React.Component<BotExplorerBarProps> {
  constructor(props: BotExplorerBarProps) {
    super(props);
  }

  render() {
    const className = this.props.hidden ? 'explorer-offscreen' : '';

    return (
      <div className={ className }  { ...CSS }>
        <ExplorerBarHeader>
          <Title>
            Bot Explorer
          </Title>
        </ExplorerBarHeader>
        <ExplorerBarBody>
          { this.props.activeBot ? (
            <>
              <EndpointExplorerContainer title="Endpoint" />
              <FileExplorer />
            </>
          )
            :
            (
              <BotNotOpenExplorer />
            )
          }
        </ExplorerBarBody>
      </div>
    );
  }
}
