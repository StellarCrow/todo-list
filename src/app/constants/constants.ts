import { IFilter } from '../models/IFilter';

export const sorting = [
  { value: 'deadline', title: 'Deadline' },
  { value: 'title', title: 'Alphabetic' },
  { value: '-creationDate', title: 'Newest' },
  { value: 'creationDate', title: 'Oldest' },
  { value: '', title: 'Clear' },
];

export const filters: IFilter[] = [
  { key: 'completed', value: true, title: 'Completed' },
  { key: 'completed', value: false, title: 'Uncompleted' },
];
