import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import BlurIn from '../components/ui/typewriter-effect';

export default function AccordionDemo() {
          return (
            <div className="w-full flex flex-col justify-center items-center  py-10  bg-secondary-dark">
              <div className="w-full pt-6  mb-12 ml-20 ">
                <BlurIn
                  word="FAQs"
                  className="text-4xl font-bold text-primary-light"
                />
              </div>{' '}
              <Accordion
                type="single"
                collapsible
                className="w-1/2 text-3xl backdrop-blur-sm text-primary-light"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    What is Darija Sentiment Analysis?
                  </AccordionTrigger>
                  <AccordionContent>
                    Darija Sentiment Analysis helps identify whether a given
                    text is positive or negative, focusing on the Moroccan
                    dialect (Darija).
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Can it handle Arabic and Latin text?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, the system supports text written in both Arabic letters
                    and Arabizi (Latin letters used for Darija).
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    How accurate is the analysis?
                  </AccordionTrigger>
                  <AccordionContent>
                    The analysis is powered by advanced AI and machine learning
                    techniques, ensuring high accuracy in detecting sentiment.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          );
}
