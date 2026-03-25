import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-destructive/10 text-destructive mx-auto flex items-center justify-center">
          <AlertCircle size={48} />
        </div>
        <h1 className="text-4xl font-display font-bold text-foreground">Page Not Found</h1>
        <p className="text-muted-foreground text-lg">
          The medical assessment module you are looking for does not exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="inline-block px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
