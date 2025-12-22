
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { verifiedEntities } from "@/data/mockData";
import { CheckCircle, Link, Phone } from "lucide-react";

const VerifiedProfiles: React.FC = () => {
  const { t, language } = useLanguage();

  // Group entities by type for better organization
  const groupedEntities = {
    bank: verifiedEntities.filter((entity) => entity.type === "bank"),
    telecom: verifiedEntities.filter((entity) => entity.type === "telecom"),
    government: verifiedEntities.filter((entity) => entity.type === "government"),
    company: verifiedEntities.filter((entity) => entity.type === "company"),
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case "bank":
        return language === "en" ? "Banks & Financial Institutions" : "البنوك والمؤسسات المالية";
      case "telecom":
        return language === "en" ? "Telecommunication Companies" : "شركات الاتصالات";
      case "government":
        return language === "en" ? "Government Entities" : "الجهات الحكومية";
      case "company":
        return language === "en" ? "Companies & Organizations" : "الشركات والمنظمات";
      default:
        return category;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">{t("verifiedProfiles")}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === "en"
              ? "These are official, verified profiles of legitimate organizations operating in Sudan. Use this information to verify if you're dealing with authentic entities."
              : "هذه هي الملفات الرسمية المعتمدة للمؤسسات الشرعية العاملة في السودان. استخدم هذه المعلومات للتحقق مما إذا كنت تتعامل مع جهات حقيقية."}
          </p>
        </div>

        {Object.entries(groupedEntities).map(
          ([category, entities]) =>
            entities.length > 0 && (
              <div key={category} className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">
                  {getCategoryTitle(category)}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {entities.map((entity) => (
                    <Card
                      key={entity.id}
                      className="border-t-4 border-salamah-primary hover:shadow-lg transition-shadow"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>
                              {language === "en" ? entity.name : entity.nameAr}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {getCategoryTitle(entity.type)}
                            </CardDescription>
                          </div>
                          <Badge className="bg-green-500 flex gap-1 items-center">
                            <CheckCircle className="h-3 w-3" />
                            {t("verified")}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Link className="h-4 w-4 text-salamah-primary" />
                            <a
                              href={entity.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-salamah-primary hover:underline"
                            >
                              {t("officialWebsite")}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-salamah-primary" />
                            <span>
                              {t("customerService")}: {entity.customerService}
                            </span>
                          </div>
                          <a href={entity.website} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="w-full mt-2 border-salamah-primary text-salamah-primary hover:bg-salamah-light">
                              {language === "en" ? "Visit Official Website" : "زيارة الموقع الرسمي"}
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default VerifiedProfiles;
