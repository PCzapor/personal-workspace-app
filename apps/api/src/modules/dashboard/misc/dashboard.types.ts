export interface DashboardSummary {
  notesCount: number;
  linksCount: number;
  recentNotes: Array<{
    id: string;
    title: string;
    updatedAt: string;
  }>;
  recentLinks: Array<{
    id: string;
    url: string;
    title: string | null;
    createdAt: string;
  }>;
}
