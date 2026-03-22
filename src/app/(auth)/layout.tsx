export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-light flex flex-col items-center justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-white flex flex-col">
        {children}
      </div>
    </div>
  );
}
