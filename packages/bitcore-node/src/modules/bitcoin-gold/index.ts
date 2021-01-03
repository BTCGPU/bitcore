import { BaseModule } from '..';
import { BTGStateProvider } from '../../providers/chain-state/btg/btg';
import { BitcoinP2PWorker } from '../bitcoin/p2p';

export default class BTGModule extends BaseModule {
  constructor(services) {
    super(services);
    services.Libs.register('BTG', 'bitcore-lib-btg', 'bitcore-p2p-btg');
    services.P2P.register('BTG', BitcoinP2PWorker);
    services.CSP.registerService('BTG', new BTGStateProvider());
  }
}
