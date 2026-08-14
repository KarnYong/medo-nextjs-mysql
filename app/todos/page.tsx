import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { q, type TodoRow } from "@/db";
import { logout } from "@/app/auth-actions";
import { addTodo, toggleTodo, deleteTodo } from "./actions";

export default async function TodosPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const todos = await q<TodoRow>(
    "SELECT id, user_id, title, done, created_at FROM todos WHERE user_id = ? ORDER BY done, id DESC",
    [user.id]
  );
  const doneCount = todos.filter((t) => t.done).length;

  return (
    <div className="flex flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-2xl items-center justify-between px-6 py-5">
        <p className="font-medium">
          <span className="text-primary">▸</span> {user.name}
        </p>
        <form action={logout}>
          <button
            type="submit"
            className="cursor-pointer rounded-lg border-2 border-border px-4 py-1.5 text-sm text-foreground/70 transition-colors duration-200 hover:border-destructive hover:text-destructive"
          >
            Log out
          </button>
        </form>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-6 pb-16">
        <div className="mb-6 flex items-end justify-between">
          <h1 className="font-display text-3xl text-foreground">Today</h1>
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-on-primary">
            {doneCount} / {todos.length} done
          </span>
        </div>

        <form action={addTodo} className="mb-6 flex gap-3">
          <label htmlFor="title" className="sr-only">
            New task
          </label>
          <input
            id="title"
            name="title"
            required
            maxLength={255}
            placeholder="Add a task…"
            className="h-12 flex-1 rounded-xl border-2 border-border bg-card px-4 text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none"
          />
          <button
            type="submit"
            className="h-12 cursor-pointer rounded-xl bg-primary px-6 font-semibold text-on-primary transition-colors duration-200 hover:bg-primary/80"
          >
            Add
          </button>
        </form>

        <ul className="space-y-3">
          {todos.length === 0 && (
            <li className="rounded-xl border-2 border-dashed border-border p-8 text-center text-foreground/50">
              Nothing yet. Add your first task above.
            </li>
          )}
          {todos.map((t) => (
            <li
              key={t.id}
              className="flex items-center gap-3 rounded-xl border-2 border-border bg-card p-4"
            >
              <form action={toggleTodo}>
                <input type="hidden" name="id" value={t.id} />
                <button
                  type="submit"
                  aria-label={t.done ? `Mark "${t.title}" not done` : `Mark "${t.title}" done`}
                  className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border-2 transition-colors duration-200 ${
                    t.done ? "border-primary bg-primary text-on-primary" : "border-border hover:border-primary"
                  }`}
                >
                  {t.done === 1 && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className="h-4 w-4" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12l5 5L20 6" />
                    </svg>
                  )}
                </button>
              </form>
              <span className={`flex-1 ${t.done ? "text-foreground/40 line-through" : "text-foreground"}`}>
                {t.title}
              </span>
              <form action={deleteTodo}>
                <input type="hidden" name="id" value={t.id} />
                <button
                  type="submit"
                  aria-label={`Delete "${t.title}"`}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-foreground/40 transition-colors duration-200 hover:bg-destructive/10 hover:text-destructive"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5h6v2m-8 0l1 12h8l1-12" />
                  </svg>
                </button>
              </form>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
