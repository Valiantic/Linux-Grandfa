import type { Metadata } from "next";
import { Press_Start_2P, VT323, Space_Mono } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
});

const vt323 = VT323({
  weight: "400",
  variable: "--font-terminal",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://linux-grandfa.vercel.app"),
  title: "Linux Grandfa | AI Linux Command Line Mentor",
  description:
    "Ask Linux Grandfa for practical Linux commands, system administration guidance, DevOps advice, and terminal screenshot analysis.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Linux Grandfa | AI Linux Command Line Mentor",
    description:
      "Get friendly, practical guidance for Linux commands, system administration, DevOps, and terminal troubleshooting.",
    url: "https://linux-grandfa.vercel.app/",
    siteName: "Linux Grandfa",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Linux Grandfa pixel art logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Linux Grandfa | AI Linux Command Line Mentor",
    description:
      "Practical Linux commands, administration guidance, DevOps advice, and terminal screenshot analysis.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pressStart.variable} ${vt323.variable} ${spaceMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
