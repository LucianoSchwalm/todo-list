export type TodoState = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string | null;
  statusId: number;
  isEditting: boolean;
};
