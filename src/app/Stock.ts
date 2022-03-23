export interface Stock {
  ticker?: string;
  name?: string;
  exchange?: string;
  logo?: string;
  ipo?: string;
  weburl?: string;
  finnhubInducstry?: string;
}

export interface Price {
  High?: number;
  Low?: number;
  Open?: number;
  Prev?: number;
  time?: string;
  drop?: number;
  dropP?: number;
  lastP?: number;
  color?: string;
  market_open?: string;
  market_color?: string;
}

export interface Peers {
  peer?: string;
}

export interface dayprices {
  data?: [];
}

export interface charts {
  date?: [];
  open?: [];
  high?: [];
  low?: [];
  close?: [];
  volume?: []
}

export interface news {
  source?: string;
  title?: string;
  info?: string;
  img?: string;
  date?: string;
  url?: string;
}

export interface sentiment {
  R_p?: number;
  R_n?: number;
  T_p?: number;
  T_n?: number;
}

//list 0
export interface Trends {
  T?: [];
  SB?: [];
  B?: [];
  H?: [];
  S?: [];
  SS?: [];
}

//list 2
export interface Insights {
  actual?: [];
  period?: [];
  surprise?: [];
  estimate?: [];

}



