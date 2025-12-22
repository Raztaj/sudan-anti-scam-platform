
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Navigation from "@/components/Navigation";
import { scammerReports, ScammerReport } from "@/data/mockData";

const SearchDatabase: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ScammerReport[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const results = scammerReports.filter(
        (report) =>
          report.identifier.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-salamah-danger text-white";
      case "medium":
        return "bg-salamah-warning text-black";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getScamTypeTranslation = (type: string) => {
    switch (type) {
      case "financial":
        return t("financial");
      case "impersonation":
        return t("impersonation");
      case "jobOffer":
        return t("jobOffer");
      case "phishing":
        return t("phishing");
      default:
        return t("other");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">{t("searchDatabase")}</h1>
            <p className="text-muted-foreground">
              {language === "en"
                ? "Check if a phone number, email, or social media account has been reported before"
                : "تحقق مما إذا كان قد تم الإبلاغ عن رقم هاتف أو بريد إلكتروني أو حساب وسائط اجتماعية من قبل"}
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-grow">
                  <Input
                    placeholder={t("enterPhoneEmail")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-salamah-primary hover:bg-salamah-secondary"
                  disabled={isSearching || !searchQuery.trim()}
                >
                  {isSearching ? 
                    (language === "en" ? "Searching..." : "جاري البحث...") : 
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      {t("search")}
                    </div>
                  }
                </Button>
              </form>
            </CardContent>
          </Card>

          {searchResults !== null && (
            <div>
              <h2 className="text-xl font-semibold mb-4">{t("searchResults")}</h2>
              
              {searchResults.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">
                      {t("noResults")}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                searchResults.map((result) => (
                  <Card key={result.id} className="mb-4 overflow-hidden">
                    <CardHeader className="p-4 bg-muted/30">
                      <div className="flex flex-wrap gap-3 items-start justify-between">
                        <div>
                          <CardTitle>{result.identifier}</CardTitle>
                          <div className="text-sm text-muted-foreground mt-1">
                            <span className="font-medium">{t("reported")}</span>{" "}
                            <span className="font-bold text-salamah-primary">{result.reportCount}</span>{" "}
                            {t("times")}
                          </div>
                        </div>
                        <Badge className={`${getRiskBadgeColor(result.riskLevel)} px-3 py-1`}>
                          {t("riskLevel")}: {t(result.riskLevel)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="mb-3">
                        <p className="font-medium mb-1">{t("scamType")}:</p>
                        <div className="flex flex-wrap gap-2">
                          {result.scamTypes.map((type, idx) => (
                            <Badge key={idx} variant="outline" className="bg-muted/50">
                              {getScamTypeTranslation(type)}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {result.descriptions.length > 0 && (
                        <div>
                          <p className="font-medium mb-1">{t("description")}:</p>
                          <ul className="list-disc ms-5 space-y-1">
                            {result.descriptions.map((desc, idx) => (
                              <li key={idx} className="text-sm">
                                {desc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="text-xs text-muted-foreground mt-4">
                        {t("reportedOn")}: {result.dateReported}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchDatabase;
