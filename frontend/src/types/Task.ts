export type TaskItem = {
  id: number;
  status: boolean;
  text: string;
};

export interface TaskProps {
  data: TaskItem;
  index: number;
  tasks: TaskItem[];
  getTasks: (e: any) => void;
  onChangeTaskStatus: (e: any) => void;
}
