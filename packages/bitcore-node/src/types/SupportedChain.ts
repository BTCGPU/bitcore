export const SupportedChainSet = {
  BTG: true
  //  BTC: true,
  //  BCH: true
};

export type SupportedChain = keyof typeof SupportedChainSet;

export function isChainSupported(chain: string): chain is SupportedChain {
  return SupportedChainSet.hasOwnProperty(chain);
}
