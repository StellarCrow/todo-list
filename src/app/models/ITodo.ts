export interface ITodo {
  userId: number;
  id: number;
  username: string;
  title: string;
  completed: boolean;
  creationDate: string | Date;
  deadline: string | Date;
}
