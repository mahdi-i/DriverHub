import { FaqTs } from "@/core/assets/@types/faq";
import { ArrowDown } from "lucide-react";
import {
  TypographyH3,
  TypographyH4,
  TypographyLarge,
  TypographyP,
} from "../typography/Typography";

function FAQWrapper({ title, faqs }: FaqTs) {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-5">
        <TypographyH3> {title}</TypographyH3>
      </div>

      <div className="grid border border-slate-200 rounded-sm ">
        {faqs.map((faq) => (
          <details
            key={faq.id}
            className="group border-b last:border-b-0 transition-all duration-300 overflow-hidden [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between p-5 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <TypographyH4 className="flex items-center justify-center  w-10 h-10 rounded-full bg-blue-100 text-secondary">
                  ?
                </TypographyH4>
                <TypographyLarge className="text-[#4b5259] md:text-lg text-sm">
                  {faq.question}
                </TypographyLarge>
              </div>
              <ArrowDown className="h-5 w-5 text-slate-400 transition-transform duration-300 group-open:rotate-180" />
            </summary>

            <div className="px-5 pb-5 pt-0 text-slate-600 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
              <TypographyP className="mt-2 md:text-md text-sm">
                {faq.answer}
              </TypographyP>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

export default FAQWrapper;
