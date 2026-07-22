import { type FormEvent, useState } from "react";
import axios from "axios";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Container } from "../../components/ui/Container";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { TextField, TextAreaField } from "../../components/ui/Field";
import { contactInfo } from "../../data/siteContent";
import { sendContactMessage } from "../../lib/contact";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage(null);
    try {
      await sendContactMessage({ name, email, message, website });
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 429) {
        setErrorMessage("Bạn đã gửi lời nhắn quá nhiều lần. Vui lòng thử lại sau ít phút.");
      } else {
        setErrorMessage("Gửi lời nhắn thất bại. Vui lòng thử lại sau.");
      }
      setStatus("error");
    }
  };

  return (
    <section className="py-20">
      <Container className="grid gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Kết nối với chúng tôi"
            title="Liên hệ"
            description="Bạn quan tâm đến A* SQUAD, muốn hợp tác hoặc có câu hỏi? Gửi lời nhắn cho chúng tôi."
          />

          <div className="mt-10 space-y-4">
            <Card className="flex items-center gap-4 p-5">
              <Mail size={20} className="text-brand-600" />
              <div>
                <p className="text-sm text-ink-400">Email</p>
                <p className="font-medium text-ink-900 dark:text-white">{contactInfo.email}</p>
              </div>
            </Card>
            <Card className="flex items-center gap-4 p-5">
              <MapPin size={20} className="text-brand-600" />
              <div>
                <p className="text-sm text-ink-400">Địa chỉ</p>
                <p className="font-medium text-ink-900 dark:text-white">{contactInfo.address}</p>
              </div>
            </Card>
          </div>
        </div>

        <Card className="p-8">
          {status === "sent" ? (
            <div className="flex flex-col items-center py-8 text-center">
              <CheckCircle2 size={32} className="text-brand-600" />
              <p className="mt-4 font-serif text-lg font-semibold text-ink-900 dark:text-white">
                Đã gửi lời nhắn thành công
              </p>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
                Chúng tôi sẽ phản hồi bạn qua email sớm nhất có thể.
              </p>
              <Button variant="ghost" size="sm" className="mt-6" onClick={() => setStatus("idle")}>
                Gửi lời nhắn khác
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative space-y-5">
              <div className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <TextField label="Họ và tên" required value={name} onChange={(e) => setName(e.target.value)} />
              <TextField
                label="Email"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextAreaField
                label="Lời nhắn"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              {status === "error" && errorMessage && (
                <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={status === "sending"}
                icon={<Send size={16} />}
              >
                {status === "sending" ? "Đang gửi..." : "Gửi lời nhắn"}
              </Button>
            </form>
          )}
        </Card>
      </Container>
    </section>
  );
}
