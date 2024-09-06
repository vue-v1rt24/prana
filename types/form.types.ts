export type TypeSetMailMessage = {
  subject: string;
  html: string;
  attachments?: Record<string, any>[];
};
