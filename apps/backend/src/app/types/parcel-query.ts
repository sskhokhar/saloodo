export interface ParcelQuery {
  createdBy?: string;
  rider?: string;
  consigneeName?: string;
  from?: string;
  to?: string;
  statuses?: any;
  populate?: string[];
}
