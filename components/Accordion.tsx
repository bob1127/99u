"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "next-i18next";

type AccordionItem = {
  question: string;
  answer: string;
};

export default function QAAccordion() {
  const { t } = useTranslation("common");

  const categories = t("Accordion.category", { returnObjects: true }) as Record<
    string,
    string
  >;
  const items = t("Accordion.items", { returnObjects: true }) as Record<
    string,
    AccordionItem[]
  >;

  const [active, setActive] = useState<{
    group: string | null;
    index: number | null;
  }>({
    group: null,
    index: null,
  });

  const toggle = (groupKey: string, itemIndex: number) => {
    const isSame = active.group === groupKey && active.index === itemIndex;
    setActive(
      isSame
        ? { group: null, index: null }
        : { group: groupKey, index: itemIndex }
    );
  };

  return (
    <div className="w-full sm:w-[500px] xl:w-[900px] mx-auto space-y-10">
      {Object.entries(categories).map(([groupKey, categoryLabel]) => (
        <div key={groupKey}>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {categoryLabel}
          </h2>
          <div className="space-y-4">
            {Array.isArray(items[groupKey]) &&
              items[groupKey].map((item, index) => {
                const isOpen =
                  active.group === groupKey && active.index === index;
                return (
                  <motion.div
                    key={index}
                    layout
                    className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm"
                  >
                    <button
                      onClick={() => toggle(groupKey, index)}
                      className="w-full flex justify-between items-center px-5 py-4 text-left hover:bg-gray-50 transition"
                    >
                      <span className="text-base font-medium text-gray-800">
                        {item.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      >
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="px-5 pb-4 text-gray-700 text-sm whitespace-pre-line bg-gray-50"
                        >
                          {item.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
