import { type FormEvent, useState } from "react";
import axios from "axios";
import { Save } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { TextField } from "../../components/ui/Field";
import { Badge } from "../../components/ui/Badge";
import { LoadingState, ErrorState } from "../../components/ui/StateMessage";
import { useFetch } from "../../hooks/useFetch";
import { getMyAccount, updateMyAccount } from "../../lib/accounts";
import { ACCOUNT_ROLE_LABELS } from "../../lib/constants";

export function MyAccount() {
  const { data, loading, error } = useFetch(() => getMyAccount(), []);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const effectiveDisplayName = displayName ?? data?.displayName ?? "";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccess(false);

    if (newPassword && newPassword !== confirmPassword) {
      setFormError("Mật khẩu mới xác nhận không khớp.");
      return;
    }

    setSaving(true);
    try {
      await updateMyAccount({
        displayName: effectiveDisplayName,
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccess(true);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setFormError(err.response.data.message);
      } else {
        setFormError("Không thể cập nhật tài khoản. Vui lòng thử lại sau.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div>
        <h1 className="font-serif text-2xl font-semibold text-ink-900 dark:text-white">
          Tài khoản của tôi
        </h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
          Cập nhật tên hiển thị và mật khẩu đăng nhập của bạn.
        </p>
      </div>

      <div className="mt-8 max-w-lg">
        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        {data && (
          <Card className="p-6">
            <div className="flex items-center justify-between border-b border-ink-200 pb-4 dark:border-ink-800">
              <div>
                <p className="font-medium text-ink-900 dark:text-white">@{data.username}</p>
                <p className="text-sm text-ink-500 dark:text-ink-400">
                  Tham gia {new Date(data.createdAt).toLocaleDateString("vi-VN")}
                </p>
              </div>
              <Badge>{ACCOUNT_ROLE_LABELS[data.role]}</Badge>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <TextField
                label="Tên hiển thị"
                value={effectiveDisplayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />

              <div className="border-t border-ink-200 pt-4 dark:border-ink-800">
                <p className="mb-3 text-sm font-medium text-ink-700 dark:text-ink-300">
                  Đổi mật khẩu (để trống nếu không đổi)
                </p>
                <div className="space-y-4">
                  <TextField
                    label="Mật khẩu hiện tại"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <TextField
                    label="Mật khẩu mới"
                    type="password"
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <TextField
                    label="Xác nhận mật khẩu mới"
                    type="password"
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              {formError && <p className="text-sm text-red-600 dark:text-red-400">{formError}</p>}
              {success && (
                <p className="text-sm text-green-700 dark:text-green-400">Đã lưu thay đổi.</p>
              )}

              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={saving} icon={<Save size={16} />}>
                  {saving ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
