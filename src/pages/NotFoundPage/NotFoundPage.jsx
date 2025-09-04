import { useRouteError } from "react-router-dom";

function NotFoundPage() {
  const error = useRouteError();
  console.error("Router error:", error);

  return (
    <div>
      <h1>Помилка</h1>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
}

export default NotFoundPage;