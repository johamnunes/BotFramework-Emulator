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
import { connect } from 'react-redux';
import { FileInfo } from '@bfemulator/app-shared';
import { pathExt } from '@fuselab/ui-shared/lib';
import { TreeView, TreeViewProps } from '@fuselab/ui-fabric/lib';
import { ExpandCollapse, ExpandCollapseContent } from '@bfemulator/ui-react';
import { IFileTreeState } from '../../../../data/reducer/files';
import { CommandServiceImpl } from '../../../../platform/commands/commandServiceImpl';
import { FileTreeDataProvider } from './fileTreeProvider';

// const css: IStyle = {
//   // tree comp overrides to match services pane style
//   selectors: {
//     '& div[class*="root-"]': {
//       height: '22px',
//       lineHeight: '22px',
//       whiteSpace: 'nowrap'
//     },
//
//     '& div[class*="level_"]': {
//       height: '14px',
//       lineHeight: '14px'
//     }
//   }
// };

interface TranscriptExplorerProps {
  activeEditor: string;
  activeDocumentId: string;
  transcripts: any[];
  files: IFileTreeState;
}

function isTranscript(path: string): boolean {
  const ext = (pathExt(path) || '').toLowerCase();
  return ext === 'transcript';
}

class TranscriptExplorerComponent extends React.Component<TranscriptExplorerProps> {

  public render(): JSX.Element {
    return (
      <ExpandCollapse
        expanded={ true }
        title="Transcript Explorer"
        // style={ css }
      >
        { this.renderFileTree() }
      </ExpandCollapse>
    );
  }

  private handleItemClick(filename: string) {
    CommandServiceImpl.call('transcript:open', filename).catch();
  }

  private renderFileTree(): JSX.Element {
    if (!this.props.files.root) {
      return null;
    }
    const provider = new FileTreeDataProvider(this.props.files);
    const props: TreeViewProps<FileInfo> = {
      loadContainer: provider.loadContainer.bind(provider),
      remove: provider.remove.bind(provider),
      insertAt: provider.insertAt.bind(provider),
      selectNode: node => {
        if (isTranscript(node.data.path)) {
          this.handleItemClick(node.data.path);
        }
        provider.selectNode.bind(provider);
      },
      selectedData: provider.selected,
      getStyle: provider.getStyle.bind(provider),
      data: provider.root,
      selected: false,
      parent: null,
      compact: true,
      readonly: true,
      theme: 'dark',
      hideRoot: true
    };

    return (
      <ExpandCollapseContent key={ 'transcript-explorer-tree' }>
        <TreeView { ...props } />
      </ExpandCollapseContent>
    );
  }
}

function mapStateToProps(state: any): TranscriptExplorerProps {
  return {
    activeEditor: state.editor.activeEditor,
    activeDocumentId: state.editor.editors[state.editor.activeEditor].activeDocumentId,
    transcripts: state.chat.transcripts,
    files: state.files
  };
}

export const TranscriptExplorer = connect(mapStateToProps)(TranscriptExplorerComponent) as any;
