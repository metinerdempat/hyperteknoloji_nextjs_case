import { Faq } from '@/types';
import { MessageCircleReply, ShieldQuestion } from 'lucide-react';
import { FC } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type Props = {
  faqs: Faq[];
};

const Faqs: FC<Props> = ({ faqs }) => {
  return (
    <div>
      <h2 className="font-bold text-xl text-blue-300 dark:text-neutral-300">Frequently Asked Questions</h2>
      <div className="mt-5">
        <Accordion type="single" collapsible className='flex flex-col gap-3'>
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id.toString()}
              className="col-span-12 lg:col-span-6 bg-white dark:bg-zinc-800 border-b-0 p-5 shadow-md rounded-md"
            >
              <AccordionTrigger>
                <h6 className="flex items-center font-medium gap-1.5">
                  <ShieldQuestion size={18} className="text-black dark:text-blue-500" />
                  <span>{faq.question}</span>
                </h6>
              </AccordionTrigger>
              <AccordionContent>
                <p className="flex items-center gap-1.5 pl-2 mt-2 text-sm">
                  <MessageCircleReply size={18} className="shrink-0" />
                  <span>{faq.answer}</span>
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Faqs;
