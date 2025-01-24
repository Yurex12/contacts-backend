type User = {
  id: string;
};

declare namespace Express {
  export interface Request {
    user: User;
  }
}

type ContactRequestBody = {
  phone: string;
  email: string;
  name: string;
};

type ContactRequestParams = {
  id: string;
};

type UserRequestBody = {
  email: string;
  username: string;
  password: string;
};
