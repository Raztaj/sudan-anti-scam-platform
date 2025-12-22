
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Navigation from "@/components/Navigation";

const ReportScam: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create schema based on current language
  const formSchema = z.object({
    identifier: z.string().min(1, {
      message: language === "en" ? "This field is required" : "هذا الحقل مطلوب",
    }),
    identifierType: z.string({
      required_error: language === "en" ? "Please select an identifier type" : "الرجاء تحديد نوع المعرّف",
    }),
    scamType: z.string({
      required_error: language === "en" ? "Please select a scam type" : "الرجاء تحديد نوع الاحتيال",
    }),
    description: z.string().min(10, {
      message: language === "en" 
        ? "Description must be at least 10 characters" 
        : "يجب أن يكون الوصف 10 أحرف على الأقل",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      identifierType: "",
      scamType: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    console.log("Form submitted:", values);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: t("reportSuccess"),
        description: language === "en" 
          ? "Thank you for helping make Sudan safer from scams."
          : "شكرًا لمساعدتك في جعل السودان أكثر أمانًا من الاحتيال.",
      });
      form.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-salamah-primary" />
          </div>
          
          <Card className="border-salamah-primary border-t-4">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t("reportScam")}</CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Help others by reporting scam attempts you've encountered"
                  : "ساعد الآخرين بالإبلاغ عن محاولات الاحتيال التي واجهتها"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="identifierType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === "en" ? "What are you reporting?" : "ما الذي تبلغ عنه؟"}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={language === "en" ? "Select type" : "اختر النوع"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="phone">{t("phoneNumber")}</SelectItem>
                            <SelectItem value="email">{t("email")}</SelectItem>
                            <SelectItem value="social">{t("socialMedia")}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="identifier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {field.value ? 
                            form.getValues("identifierType") === "phone" ? t("phoneNumber") : 
                            form.getValues("identifierType") === "email" ? t("email") : 
                            t("socialMedia")
                          : language === "en" ? "Identifier" : "المعرّف"}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="scamType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("scamType")}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t("selectScamType")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="financial">{t("financial")}</SelectItem>
                            <SelectItem value="impersonation">{t("impersonation")}</SelectItem>
                            <SelectItem value="jobOffer">{t("jobOffer")}</SelectItem>
                            <SelectItem value="phishing">{t("phishing")}</SelectItem>
                            <SelectItem value="other">{t("other")}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("description")}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={
                              language === "en"
                                ? "Please describe the scam attempt in detail..."
                                : "يرجى وصف محاولة الاحتيال بالتفصيل..."
                            }
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-center">
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto bg-salamah-primary hover:bg-salamah-secondary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 
                        (language === "en" ? "Submitting..." : "جاري الإرسال...") : 
                        t("submit")
                      }
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportScam;
