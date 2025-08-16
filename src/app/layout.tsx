import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "GovEase - Government Service Portal",
  description: "Streamlined government service appointments for Sri Lankan citizens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased font-sans`}
      >
        <AuthProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #4f46e5 100%)',
                color: '#fff',
                borderRadius: '12px',
                boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.4), 0 10px 10px -5px rgba(59, 130, 246, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(8px)',
                fontWeight: '600',
                fontSize: '14px',
                padding: '16px 20px',
                maxWidth: '420px',
              },
              success: {
                style: {
                  background: 'linear-gradient(135deg, #059669 0%, #16a34a 100%)',
                  boxShadow: '0 20px 25px -5px rgba(5, 150, 105, 0.4), 0 10px 10px -5px rgba(5, 150, 105, 0.2)',
                }
              },
              error: {
                style: {
                  background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                  boxShadow: '0 20px 25px -5px rgba(220, 38, 38, 0.4), 0 10px 10px -5px rgba(220, 38, 38, 0.2)',
                }
              },
              loading: {
                style: {
                  background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                  boxShadow: '0 20px 25px -5px rgba(245, 158, 11, 0.4), 0 10px 10px -5px rgba(245, 158, 11, 0.2)',
                }
              }
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
