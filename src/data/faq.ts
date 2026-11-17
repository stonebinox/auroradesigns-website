import { site } from './site';

export const faqPage = {
  title: 'FAQ',
  heading: 'Frequently asked questions',
  breadcrumb: 'FAQ',
  description: 'Answers to questions buyers ask before they hire Aurora Designs.',
  groups: [
    {
      heading: 'About Aurora Designs',
      questions: [
        'What does Aurora Designs do?',
        'Who founded Aurora Designs?',
        'Where does Aurora Designs work?',
        'What is a forward-deployed engineer?',
      ],
    },
    {
      heading: 'How we work',
      questions: [
        'How does Aurora Designs use AI?',
        'Does AI write code that goes straight to production?',
        'What stays after an engagement ends?',
        'Which AI models do you use?',
      ],
    },
    {
      heading: 'Working together',
      questions: ['How do I start an engagement?'],
    },
  ],
};

export function resolveFaqGroups() {
  return faqPage.groups.map((g) => ({
    heading: g.heading,
    faqs: g.questions.map((q) => {
      const faq = site.faqs.find((f) => f.q === q);
      if (!faq) throw new Error(`FAQ group "${g.heading}" lists unknown question: ${q}`);
      return faq;
    }),
  }));
}
