import { api } from "./api";

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
  website?: string;
}

export const sendContactMessage = async (payload: ContactRequest): Promise<void> => {
  await api.post("/api/contact", payload);
};
