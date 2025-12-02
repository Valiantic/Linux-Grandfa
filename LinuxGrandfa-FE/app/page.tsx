import { PixelLogo, ChatBox } from "./components";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-zinc-950 overflow-hidden">
      {/* Pixel grid background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Scanline effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-10"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 4px)",
        }}
      />

      {/* CRT vignette effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
        }}
      />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-start gap-8 px-4 py-12">
        {/* Header with Logo */}
        <header className="flex flex-col items-center gap-6">
          <PixelLogo size={140} />
          
          {/* Title with 3D pixel effect */}
          <div className="relative">
            {/* Shadow layers for 3D effect */}
            <h1 
              className="absolute font-pixel text-2xl md:text-3xl text-black translate-x-1 translate-y-1"
              aria-hidden="true"
            >
              Linux Grandfa
            </h1>
            <h1 
              className="absolute font-pixel text-2xl md:text-3xl text-green-900 translate-x-0.5 translate-y-0.5"
              aria-hidden="true"
            >
              Linux Grandfa
            </h1>
            <h1 className="relative font-pixel text-2xl md:text-3xl text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
              Linux Grandfa
            </h1>
          </div>

          {/* Subtitle */}
          <p className="font-terminal text-xl text-zinc-400 tracking-wider">
            &gt; Your wise old command line companion_
          </p>
        </header>

        {/* Decorative pixel divider */}
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-green-500/60 border border-green-400"
              style={{
                animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Chat Box */}
        <ChatBox />

        {/* Footer */}
        <footer className="mt-8 flex flex-col items-center gap-4">
          <p className="font-terminal text-2xl text-zinc-400 tracking-wider">
            © {new Date().getFullYear()} Linux Grandfa • By Steven Madali 🤖
          </p>
        </footer>
      </main>
    </div>
  );
}
