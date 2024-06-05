import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { User } from "firebase/auth";

export default function ProtectedRoute({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={`/login?from=${path}`} />;
  }

  return children;
}
