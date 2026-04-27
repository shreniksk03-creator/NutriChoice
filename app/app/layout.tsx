import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Navbar from '@/components/Navbar';
import { MealProvider } from '@/context/MealContext';

export const metadata = {
  title: 'NutriChoice',
  description: 'Smart Food & Health Habit Web Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MealProvider>
          <Navbar />
          <main className="container my-4">
            {children}
          </main>
        </MealProvider>
      </body>
    </html>
  );
}
