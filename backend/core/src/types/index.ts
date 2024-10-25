export interface Token {
    symbol: string;
    address: string;
    decimals: number;
    chainId: number;
  }
  
  export interface Transaction {
    fromChain: number;
    toChain: number;
    fromAddress: string;
    toAddress: string;
    amount: string;
    token: Token;
    status: 'pending' | 'completed' | 'failed';
    txHash: string;
    timestamp: number;
  }
  
  export interface WSMessage {
    type: 'transaction' | 'status';
    data: any;
  }