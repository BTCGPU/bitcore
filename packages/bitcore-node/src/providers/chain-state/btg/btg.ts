import { InternalStateProvider } from '../internal/internal';

export class BTGStateProvider extends InternalStateProvider {
  constructor(chain: string = 'BTG') {
    super(chain);
  }
}
