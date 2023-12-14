import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='light'>
      <head>
        <title>A Simple Weather App</title>
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
