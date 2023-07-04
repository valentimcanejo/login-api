export default function Home() {
  return (
    <main className="flex h-screen justify-center items-center">
      <form className="flex w-full max-w-md flex-col bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-xl gap-8">
        <label className="text-lg font-medium">
          Faça o login com seu email
        </label>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Email</label>
          <input
            type="email"
            className="p-4 dark:bg-zinc-800 rounded-lg border"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Senha</label>
          <input
            type="password"
            className="p-4 dark:bg-zinc-800 rounded-lg border"
            placeholder="Senha"
          />
        </div>
        <button className="bg-blue-400 hover:bg-blue-500 p-4 rounded-lg">
          Login
        </button>
      </form>
    </main>
  );
}
