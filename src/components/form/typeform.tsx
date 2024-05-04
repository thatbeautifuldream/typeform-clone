"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MaterialInput as Input } from "@/components/form/material-input";
import { cn } from "@/lib/utils";

export default function Typeform() {
  const formSchema = z.object({
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "Last name is too short"),
    industry: z.string().min(2, "Industry is required"),
    role: z.string().min(2, "Role is required"),
    goals: z.array(z.string()).min(1, "At least one goal is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is too short"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      industry: "",
      role: "",
      goals: [],
      email: "",
      phone: "",
    },
  });

  const questions = [
    {
      id: 1,
      type: "text",
      text: "What is your first name?",
      placeholder: "Enter your first name",
      isRequired: true,
    },
    {
      id: 2,
      type: "text",
      text: `and what is your last name, ${form.getValues("firstName")}?`,
      isRequired: true,
    },
    {
      id: 3,
      type: "select",
      text: "What industry is your company in?",
      subText: "We will personalize your learning experience accordingly",
      isRequired: true,
    },
    {
      id: 4,
      type: "radio",
      text: "What is Your role in your company?",
      subText: "We want to understand how you spend your time right now.",
      description:
        "[ 🔴DEVELOPER NOTICE: Options in the questions ahead depend on this question's response/s. ]",
      options: [
        "Founder or CXO",
        "Product Team",
        "Marketing Team",
        "VC",
        "Other",
      ],
      isRequired: true,
    },
    {
      id: 5,
      type: "radio-group",
      text: "{name}, what's your professional goal for the next 12 months?",
      options: [
        "Get hired",
        "Get promoted",
        "Connect with like minded people",
        "Structured approach to growth",
        "Build a growth team",
      ],
      condition: (answers) =>
        answers.find((a) => a.id === 4) &&
        answers.find((a) => a.id === 4).value !== "Founder or CXO",
      maxSelect: 2,
      isRequired: true,
    },
    {
      id: 6,
      type: "radio-group",
      text: "{name}, what's your professional goal for the next 12 months?",
      options: [
        "Structured approach to growth",
        "Build a growth team",
        "Connect with like minded people",
      ],
      condition: (answers) =>
        answers.find((a) => a.id === 4) &&
        answers.find((a) => a.id === 4).value === "Founder or CXO",
      maxSelect: 2,
      isRequired: true,
    },
    {
      id: 7,
      type: "text",
      text: "Email you'd like to register with?",
      subText:
        "We will keep all our communications with you through this email. Do check your spam inbox if you can't find our application received email.[ 🔴DEVELOPER NOTICE: Responses submitted to this form will be forwarded to the email you input here, for you to test data submissions.]",
      placeholder: "name@example.com",
      validation: "email",
      isRequired: true,
    },
    {
      id: 8,
      type: "text",
      text: "Your phone number",
      subText:
        "We won't call you unless it is absolutely required to process your application.",
      placeholder: "089621 8845",
      validation: "phone",
      isLastQuestion: true,
      isRequired: true,
    },
  ];

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
  }
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name={"firstName"}
            render={({ field }) => (
              <FormItem>
                <p className="text-foreground/50 text-sm">
                  Question {questions[0].id} of {questions.length}
                </p>
                <FormLabel className="text-2xl font-regular">
                  {questions[0].text}
                  <span
                    className={cn(
                      "text-destructive font-bold",
                      questions[0].isRequired ? "" : "hidden",
                    )}
                  >
                    *
                  </span>
                </FormLabel>
                <p className="text-gray-500">{questions[0].subText}</p>
                <FormControl>
                  <Input
                    className="text-lg"
                    placeholder={questions[0].placeholder}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{questions[0].description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2 whitespace-normal">
            <Button type="submit" className="text-white font-bold">
              {questions[0].isLastQuestion ? "Submit" : "OK"}
            </Button>
            <p className="text-foreground/50 text-sm">
              press <span className="font-semibold leading-none">Enter ↵</span>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
