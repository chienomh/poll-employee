export interface IFormData {
  user: string;
  password: string;
}

export interface IUser {
  id: string;
  password: string;
  name: string;
  avatarURL: string | null;
  answers: { [questionId: string]: string };
  questions: string[];
}

export interface IUsers {
  [userId: string]: IUser;
}

export interface ILoginIitial {
  isLoading: string;
  users?: IUsers;
  currentUser?: IUser;
}
