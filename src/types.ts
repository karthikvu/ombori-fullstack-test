export type InitialState<T> = {
  data: T[];
  page: number;
  total_pages: number;
};

export type ApiResponse<T> = InitialState<T> & {
  per_page: number;
  support: any;
  total: number;
};

export type TUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};
