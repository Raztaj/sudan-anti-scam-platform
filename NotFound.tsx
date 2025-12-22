
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { t, language } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <Shield className="h-20 w-20 text-salamah-primary mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          {language === "en" 
            ? "Oops! Page not found" 
            : "عفوا! الصفحة غير موجودة"}
        </p>
        <Link to="/">
          <Button className="bg-salamah-primary hover:bg-salamah-secondary">
            {language === "en" ? "Return to Home" : "العودة إلى الصفحة الرئيسية"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
