export type TDealStatus = 'new' | 'in_progress' | 'completed' | 'cancelled';

export type TDeal = {
  id: string;

  title: string;
  description?: string;

  clientId: string;
  amount: number;

  status: TDealStatus;

  createdAt: string;
  completedAt?: string;

  createdBy: string; // userId
};

export type TDealSortField = 'title' | 'clientId' | 'status' | 'amount' | 'createdAt' | 'completedAt';

export type TDealListFilters = {
  search?: string;
  status?: TDealStatus;
  clientId?: string;
  amountFrom?: number;
  amountTo?: number;
  createdFrom?: string;
  createdTo?: string;
  completedFrom?: string;
  completedTo?: string;
  createdBy?: string;
  managerId?: string;
  sortBy?: TDealSortField;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
};

export type TDealListRow = TDeal & {
  clientName: string;
};

export type TCreateDealPayload = {
  title: string;
  description?: string;
  clientId: string;
  amount: number;
  status?: TDealStatus;
};

export type TUpdateDealPayload = {
  title?: string;
  description?: string;
  amount?: number;
  status?: TDealStatus;
  completedAt?: string;
};

export type TUpdateDealByIdPayload = {
  id: string;
  data: TUpdateDealPayload;
};
