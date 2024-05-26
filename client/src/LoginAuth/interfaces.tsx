export interface GetInfinitePagesInterface<T> {
    nextId?: number;
    previousId?: number;
    data: T;
    count: number;
  }
  

  export interface CreateUser {
    email: string;
    fullName: string;
    userName: string;
    password: string;
  }