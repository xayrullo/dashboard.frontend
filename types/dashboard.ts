export interface ITotalSales {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string[] | string;
    hoverOffset: number;
  }>;
}

export interface ITotalSalesResponse {
  label: string;
  data: number;
  backgroundColor: string;
}

export interface ICardsResponse {
  totalSales: number;
  totalOrders: number;
  bill: number;
  users: number;
}
