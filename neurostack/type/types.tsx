export type ProjectType = {
  id: number;
  projectId: string;
  userId: string;
  device: string;
  userInput: string;
  createdAt: string;

  projectName?: string;
  theme?: string;
  projectVisualDescription?: string;
  screenshotUrl?: string;
};

export type ScreenConfig = {
  id: number;
  projectId: string;
  screenId: string;
  screenName?: string;
  purpose?: string;
  screenDescription?: string;
  code?: string;
};
