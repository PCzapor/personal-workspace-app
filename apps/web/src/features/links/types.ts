export interface SavedLink {
  id: string;
  url: string;
  title: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLinkInput {
  url: string;
  title?: string;
  description?: string;
}

export interface UpdateLinkInput {
  title?: string;
  description?: string;
}
