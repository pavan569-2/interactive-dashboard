interface HeaderProps {
  projectName: string;
}

export default function Header({ projectName }: HeaderProps) {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="bg-gray-900 border-b border-gray-700 px-6 py-5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Project Tracker Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">{projectName}</p>
        </div>
        <p className="text-sm text-gray-500">{today}</p>
      </div>
    </header>
  );
}
