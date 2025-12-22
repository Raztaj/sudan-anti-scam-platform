
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Shield,
  Search,
  CheckCircle,
  MessageSquare,
  Bell
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { alertMessages } from "@/data/mockData";

const FeatureCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  to: string;
  description: string;
}> = ({ title, icon, to, description }) => {
  return (
    <Card className="feature-card hover:scale-105">
      <div className="flex flex-col items-center text-center">
        <div className="p-4 bg-salamah-light rounded-full mb-4 text-salamah-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
      </div>
      <Link to={to} className="w-full">
        <Button className="w-full bg-salamah-primary hover:bg-salamah-secondary">
          {title}
        </Button>
      </Link>
    </Card>
  );
};

const AlertCard: React.FC<{
  title: string;
  content: string;
  source: string;
  date: string;
  type: string;
}> = ({ title, content, source, date, type }) => {
  const alertColor = type === "warning" ? "bg-salamah-warning/10 border-salamah-warning" :
                    type === "alert" ? "bg-salamah-danger/10 border-salamah-danger" : 
                    "bg-salamah-accent/10 border-salamah-accent";
                    
  const iconColor = type === "warning" ? "text-salamah-warning" :
                  type === "alert" ? "text-salamah-danger" : 
                  "text-salamah-accent";
  
  return (
    <Card className={`mb-4 ${alertColor} border-l-4`}>
      <CardContent className="p-4">
        <div className="flex items-start">
          <Bell className={`h-5 w-5 mt-1 ${iconColor}`} />
          <div className="ms-3">
            <h4 className="font-semibold">{title}</h4>
            <p className="mt-1 text-sm">{content}</p>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>
                <strong>Source:</strong> {source}
              </span>
              <span>{date}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Index: React.FC = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      title: t("reportScam"),
      icon: <Shield className="h-10 w-10" />,
      to: "/report",
      description: language === "en" 
        ? "Report suspicious phone numbers, emails, or social media accounts" 
        : "الإبلاغ عن أرقام هواتف أو بريد إلكتروني أو حسابات وسائط اجتماعية مشبوهة"
    },
    {
      title: t("searchDatabase"),
      icon: <Search className="h-10 w-10" />,
      to: "/search",
      description: language === "en"
        ? "Check if a number or account has been reported before"
        : "التحقق مما إذا كان قد تم الإبلاغ عن رقم أو حساب من قبل"
    },
    {
      title: t("verifiedProfiles"),
      icon: <CheckCircle className="h-10 w-10" />,
      to: "/verified",
      description: language === "en"
        ? "View official profiles of banks and companies"
        : "عرض الملفات الشخصية الرسمية للبنوك والشركات"
    },
    {
      title: t("checkMessage"),
      icon: <MessageSquare className="h-10 w-10" />,
      to: "/check-message",
      description: language === "en"
        ? "Analyze a suspicious message for scam patterns"
        : "تحليل الرسائل المشبوهة للكشف عن أنماط الاحتيال"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero section */}
      <section className="bg-gradient-to-b from-salamah-primary to-salamah-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center">
            <Shield className="h-20 w-20 mb-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("appName")}</h1>
          <p className="text-xl md:text-2xl mb-8">{t("tagline")}</p>
          <p className="max-w-2xl mx-auto mb-8">
            {language === "en" 
              ? "Protect yourself and others from scams in Sudan by reporting suspicious activities and verifying information through our trusted platform."
              : "احم نفسك والآخرين من عمليات الاحتيال في السودان من خلال الإبلاغ عن الأنشطة المشبوهة والتحقق من المعلومات من خلال منصتنا الموثوقة."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/report">
              <Button className="bg-white text-salamah-primary hover:bg-salamah-light">
                {t("reportScam")}
              </Button>
            </Link>
            <Link to="/search">
              <Button variant="outline" className="text-white border-white hover:bg-salamah-secondary">
                {t("searchDatabase")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {language === "en" ? "Protect Yourself from Scams" : "احم نفسك من الاحتيال"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                icon={feature.icon}
                to={feature.to}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest alerts section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">{t("latestAlerts")}</h2>
          <div className="max-w-3xl mx-auto">
            {alertMessages.map((alert) => (
              <AlertCard
                key={alert.id}
                title={language === "en" ? alert.title : alert.titleAr}
                content={language === "en" ? alert.content : alert.contentAr}
                source={language === "en" ? alert.source : alert.sourceAr}
                date={alert.date}
                type={alert.type}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-salamah-primary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>
            {language === "en" 
              ? "© 2025 Salamah - Sudan Anti-Scam Platform. All rights reserved." 
              : "© 2025 سلامة - منصة السودان لمكافحة الاحتيال. جميع الحقوق محفوظة."}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
