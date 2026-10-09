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
            <div
              className="absolute font-pixel text-2xl md:text-3xl text-black translate-x-1 translate-y-1"
              aria-hidden="true"
            >
              Linux Grandfa
            </div>
            <div
              className="absolute font-pixel text-2xl md:text-3xl text-green-900 translate-x-0.5 translate-y-0.5"
              aria-hidden="true"
            >
              Linux Grandfa
            </div>
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

        <section className="w-full max-w-4xl space-y-4 font-terminal text-xl leading-relaxed text-zinc-300">
          <h2 className="font-pixel text-lg text-green-400">Your Linux command line mentor</h2>
          <p>
            Linux Grandfa is an AI-powered command line mentor for people learning Linux,
            Unix, system administration, and DevOps. Ask Nesti, our friendly Linux assistant,
            how to understand a command, diagnose a terminal error, configure a service, or
            choose a safer way to manage a system. The goal is practical guidance that helps
            you learn what a command does before you run it.
          </p>
          <p>
            Use the terminal-style chat to ask about shell commands, file permissions, users
            and groups, processes, networking, package managers, logs, storage, containers,
            and common administration workflows. You can also upload a terminal screenshot or
            configuration image when an error is difficult to describe in text. Nesti focuses
            on Linux and Unix system administration topics and explains answers in a friendly,
            conversational style without assuming that every question needs advanced jargon.
          </p>
          <p>
            Linux Grandfa is useful for students, developers, new system administrators, and
            experienced operators who want a second perspective while troubleshooting. Read
            each suggested command, check its impact in your environment, and adapt examples
            to your distribution and permissions. This tool is an educational companion, not
            a replacement for backups, change review, security policy, or production testing.
          </p>
          <p>
            Start with a plain-language question such as how to find a process, inspect disk
            usage, follow a service log, create a secure user, or understand a shell pipeline.
            For better answers, include your Linux distribution, the command you tried, and
            the relevant error message. When sharing screenshots or configuration files,
            remove passwords, private keys, tokens, and other sensitive information first.
            Linux Grandfa turns that context into an approachable explanation, example
            commands, and troubleshooting steps you can verify in your own environment.
          </p>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://linux-grandfa.vercel.app/#organization",
                  name: "Linux Grandfa",
                  url: "https://linux-grandfa.vercel.app/",
                  logo: "https://linux-grandfa.vercel.app/logo.png",
                  sameAs: [],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://linux-grandfa.vercel.app/#website",
                  name: "Linux Grandfa",
                  url: "https://linux-grandfa.vercel.app/",
                  publisher: {
                    "@id": "https://linux-grandfa.vercel.app/#organization",
                  },
                },
              ],
            }),
          }}
        />

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
