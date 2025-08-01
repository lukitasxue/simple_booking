"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does WhatsApp integration work?",
    answer: "We connect directly with your WhatsApp Business API. You just need to authorize the connection and configure automatic responses."
  },
  {
    question: "Can the chatbot handle complex bookings?",
    answer: "Yes, our AI can manage bookings with multiple options, dates, schedules and automatic confirmations."
  },
  {
    question: "What languages does it support?",
    answer: "We currently support Spanish, English, Portuguese and French. You can configure the language according to your audience."
  },
  {
    question: "Can I customize the responses?",
    answer: "Absolutely. You can create personalized responses, add your brand tone and configure specific flows."
  },
  {
    question: "Is there a message limit?",
    answer: "The free plan includes 100 messages/month. Paid plans include more volume and Enterprise is unlimited."
  },
  {
    question: "How fast is the setup?",
    answer: "Basic configuration takes less than 15 minutes. Our team helps you with advanced configuration."
  }
];

export function Questions() {
  return (
    <section className="w-full py-12 md:py-24 max-w-2xl mx-auto">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground pr-9">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default Questions;
