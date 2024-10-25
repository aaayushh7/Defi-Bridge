export interface Token {
    symbol: string;
    address: string;
    decimals: number;
    chainId: number;
  }
  
  export interface BridgeTransaction {
    id: string;
    fromChain: number;
    toChain: number;
    amount: string;
    token: Token;
    status: 'pending' | 'completed' | 'failed';
    timestamp: number;
  }