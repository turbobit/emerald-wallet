import { ipcRenderer } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies
import { api } from '../../lib/rpc/api';
// import { waitForServicesRestart } from 'store/store';
import screen from '../wallet/screen';
import createLogger from '../../utils/logger';

const log = createLogger('launcherActions');

function isEthRpcReady(state) {
  return state.launcher.getIn(['geth', 'status']) === 'ready';
}

function isVaultReady(state) {
  return state.launcher.getIn(['connector', 'status']) === 'ready';
}

export function readConfig() {
  if (typeof window.process !== 'undefined') {
    const remote = global.require('electron').remote;
    const launcherConfig = remote.getGlobal('launcherConfig').get();

    log.info(`Got launcher config from electron: ${JSON.stringify(launcherConfig)}`);

    return {
      type: 'LAUNCHER/CONFIG',
      config: launcherConfig,
      launcherType: 'electron',
    };
  }
  return {
    type: 'LAUNCHER/CONFIG',
    config: {},
    launcherType: 'browser',
  };
}

export function loadClientVersion() {
  return (dispatch) => {
    api.geth.web3.clientVersion().then((result) => {
      dispatch({
        type: 'LAUNCHER/CONFIG',
        config: {
          chain: {
            client: result,
          },
        },
      });
      dispatch({
        type: 'LAUNCHER/SETTINGS',
        updated: true,
      });
    });
  };
}

export function useRpc(gethProvider) {
  return (dispatch) => {
    dispatch({
      type: 'LAUNCHER/CONFIG',
      config: {
        ...gethProvider,
      },
    });
    dispatch({
      type: 'LAUNCHER/SETTINGS',
      updated: true,
    });
  };
}

export function agreeOnTerms(v) {
  ipcRenderer.send('terms', v);
  return {
    type: 'LAUNCHER/TERMS',
    version: v,
  };
}

export function saveSettings(extraSettings) {
  extraSettings = extraSettings || {};
  return (dispatch, getState) => {
    const geth = getState().launcher.get('geth').toJS();
    const chain = getState().launcher.get('chain').toJS();

    const settings = { geth, chain, ...extraSettings };

    log.info('Save settings', settings);

    // waitForServicesRestart();

    ipcRenderer.send('settings', settings);

    dispatch({
      type: 'LAUNCHER/SETTINGS',
      updated: false,
    });
  };
}

export function connecting(value) {
  return {
    type: 'LAUNCHER/CONNECTING',
    value,
  };
}
