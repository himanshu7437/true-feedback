"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { messageSchema } from "@/schemas/messageSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";

const Page = () => {
  const params = useParams();
  const username = Array.isArray(params.username)
    ? params.username[0]
    : params.username;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGettingSuggestion, setIsGettingSuggestion] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: { content: "" },
  });

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsSubmitting(true);
    try {
      await axios.post<ApiResponse>("/api/send-message", {
        username,
        content: data.content,
      });
      toast.success("Message sent successfully");
      form.reset();
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast("Error in sending message", {
        description: axiosError.response?.data.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuggestion = async () => {
    try {
      setIsGettingSuggestion(true);
      const response = await axios.get("/api/suggest-messages");

      const result: string = response.data.result;
      setSuggestions(
        result
          .split("||")
          .map((s) => s.trim())
          .filter(Boolean)
      );

      toast.success("Suggestions generated");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast("Error fetching suggestions", {
        description: axiosError.response?.data.message,
      });
    } finally {
      setIsGettingSuggestion(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      {/* Page container */}
      <div className="mx-auto w-full max-w-full md:max-w-2xl lg:max-w-4xl xl:max-w-6xl space-y-8">
        <h1 className="text-3xl font-semibold text-center">
          Send Anonymous Message to {username}
        </h1>

        {/* Form */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Message</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Write your anonymous message here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row gap-3">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSuggestion}
                  disabled={isGettingSuggestion}
                  className="flex-1"
                >
                  {isGettingSuggestion ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Suggest Messages"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Click a suggestion to auto-fill 👇
            </p>

            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() =>
                    form.setValue("content", suggestion, {
                      shouldValidate: true,
                    })
                  }
                  className="cursor-pointer rounded-md bg-white p-4 shadow-sm transition hover:bg-gray-50"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
