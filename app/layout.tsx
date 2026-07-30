import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Bandmark — IELTS practice tests scored on the real band scale",
  description: "Timed Listening, Reading, Writing and Speaking mock tests with band-scale scoring.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body bg-paper text-[#1A1F2B]">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
