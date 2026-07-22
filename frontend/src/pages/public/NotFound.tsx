import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Container } from "../../components/ui/Container";
import { useTranslation } from "../../lib/translations";

export function NotFound() {
  const { t } = useTranslation();

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-script text-4xl text-brand-600 dark:text-brand-400">{t.notFound.oops}</p>
      <h1 className="mt-2 font-serif text-5xl font-bold text-ink-900 dark:text-white">404</h1>
      <p className="mt-4 text-ink-500 dark:text-ink-400">{t.notFound.message}</p>
      <Link to="/" className="mt-8">
        <Button>{t.notFound.home}</Button>
      </Link>
    </Container>
  );
}
