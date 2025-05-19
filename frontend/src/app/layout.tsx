import './globals.css';
import Navigation from '../components/Navigation';
import ApolloWrapper from '../components/ApolloWrapper';

export const metadata = {
  title: 'User Auth App',
  description: 'A full-stack user authentication application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            {children}
          </div>
        </ApolloWrapper>
      </body>
    </html>
  );
}
