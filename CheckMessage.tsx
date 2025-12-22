
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import { suspiciousPhrases, suspiciousPhrasesAr } from "@/data/mockData";
import { AlertTriangle, MessageSquare } from "lucide-react";

const CheckMessage: React.FC = () => {
  const { t, language } = useLanguage();
  const [message, setMessage] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    matches: string[];
    riskLevel: "high" | "medium" | "low";
  } | null>(null);

  const analyzeMessage = () => {
    if (!message.trim()) return;

    setAnalyzing(true);
    
    // Simple analysis logic - count matches with suspicious phrases
    setTimeout(() => {
      const phrases = language === "en" ? suspiciousPhrases : suspiciousPhrasesAr;
      const lowerMessage = message.toLowerCase();
      
      const matches = phrases.filter(phrase => 
        lowerMessage.includes(phrase.toLowerCase())
      );
      
      // Calculate risk score (0-100)
      const score = Math.min(100, (matches.length / phrases.length) * 100);
      
      // Determine risk level
      let riskLevel: "high" | "medium" | "low" = "low";
      if (score >= 60) riskLevel = "high";
      else if (score >= 30) riskLevel = "medium";
      
      setResult({
        score: Math.round(score),
        matches,
        riskLevel
      });
      
      setAnalyzing(false);
    }, 1500);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "text-salamah-danger";
      case "medium":
        return "text-salamah-warning";
      case "low":
        return "text-green-500";
      default:
        return "";
    }
  };

  const getRiskBgColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-salamah-danger";
      case "medium":
        return "bg-salamah-warning";
      case "low":
        return "bg-green-500";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <MessageSquare className="h-16 w-16 text-salamah-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4">{t("checkMessage")}</h1>
            <p className="text-muted-foreground">
              {language === "en"
                ? "Analyze suspicious messages for common scam patterns and warning signs"
                : "تحليل الرسائل المشبوهة للكشف عن أنماط وعلامات الاحتيال الشائعة"}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t("checkMessage")}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Paste a suspicious message to check for scam patterns"
                  : "الصق رسالة مشبوهة للتحقق من أنماط الاحتيال"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={t("pasteMessage")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[150px] mb-4"
              />
              <Button
                onClick={analyzeMessage}
                className="w-full bg-salamah-primary hover:bg-salamah-secondary"
                disabled={analyzing || !message.trim()}
              >
                {analyzing ? t("analyzing") : t("analyze")}
              </Button>
            </CardContent>
            {result && (
              <CardFooter className="flex flex-col">
                <div className="w-full border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">{t("riskLevel")}</div>
                    <Badge className={`${getRiskBgColor(result.riskLevel)} text-white px-3 py-1`}>
                      {t(result.riskLevel)}
                    </Badge>
                  </div>
                  <Progress value={result.score} className="h-2 mb-4" />
                  
                  {result.matches.length > 0 ? (
                    <div className="mt-4 bg-muted/30 p-4 rounded-md">
                      <div className="flex items-start gap-2 mb-3">
                        <AlertTriangle className={`h-5 w-5 mt-0.5 ${getRiskColor(result.riskLevel)}`} />
                        <div>
                          <p className="font-medium">
                            {language === "en"
                              ? "Suspicious elements detected"
                              : "تم الكشف عن عناصر مشبوهة"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {language === "en"
                              ? `This message contains ${result.matches.length} suspicious patterns`
                              : `تحتوي هذه الرسالة على ${result.matches.length} أنماط مشبوهة`}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-sm">
                        <p className="font-medium mb-2">
                          {language === "en" ? "Suspicious patterns:" : "الأنماط المشبوهة:"}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {result.matches.map((match, idx) => (
                            <Badge key={idx} variant="outline" className="bg-muted/50">
                              {match}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-muted/30 p-4 rounded-md">
                      <p className="text-green-600 font-medium">
                        {language === "en"
                          ? "No suspicious patterns detected"
                          : "لم يتم اكتشاف أنماط مشبوهة"}
                      </p>
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground mt-4">
                    {t("disclaimer")}
                  </p>
                </div>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckMessage;
