export interface Letter {
    _id: string;
    userId: string;
    title: string;
    content: string;
    googleDriveId?: string;
    createdAt: string;
    updatedAt: string;
  }