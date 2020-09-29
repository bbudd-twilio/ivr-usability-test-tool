import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import WOzWorkspace from './components/WOzWorkspace';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'WOzToolZeroPlugin';

export default class WOzToolZeroPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);

     
    console.log('BBTRACE:  process.env=',process.env)


    // Set Panel2 to the WOZ Tool
    flex.AgentDesktopView
      .Panel2
      .Content
      .replace(<WOzWorkspace key="woz-workspace" flexInstance={flex} manager={manager}/>);

    // Simplify the Task Canvas
      flex.TaskCanvasTabs.Content.remove('info');


    // Put Panel1 hard left at all times
    flex.AgentDesktopView.Panel1.defaultProps.splitterOrientation='vertical';
    flex.AgentDesktopView.defaultProps.splitterOptions={initialFirstPanelSize:'25%'};


  }
  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
