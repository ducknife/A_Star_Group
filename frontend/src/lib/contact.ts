import { api } from "./api";

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

export const sendContactMessage = async (payload: ContactRequest): Promise<void> => {
  await api.post("/api/contact", payload);
};
