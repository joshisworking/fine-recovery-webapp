export type Fine = {
  fineId?: number;
  amount: number;
  date: string;
  courtFile: string;
  courthouseId: number;
  courthouseName: string;
  subjectId?: number;
  subjectName?: string;
  datePaid: string | null;
};
