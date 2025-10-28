import React from 'react';

interface TestimonialItem {
  quote: React.ReactNode;
  author: string;
  company: string;
  position: string;
}

export const testimonials: TestimonialItem[] = [
  {
    quote: (
      <>
        Viktor built our platform from the ground up and led engineering through multiple
        stages of growth as we scaled to <b>1,500+ MAU</b>. One by one, he planned and
        engineered the replacement of various off-the-shelf tools with a fully customized
        system, all the while maintaining data integrity and uptime. This included the{' '}
        <b>replacement of and/or integration with Zendesk, PagerDuty, Stripe, Twilio,</b> etc.
        <br />
        We <b>cut costs, simplified our stack, and increased reliability and ownership</b>. He
        set a high bar for hiring, standards, and delivery.
      </>
    ),

    author: 'Joey Kolchinsky',
    company: 'OneVision Resources',
    position: 'Founder & CEO',
  },
  {
    quote: (
      <>
        Viktor played a key role in developing and scaling our WO Omni and WO Amethyst
        products. As a full-stack engineer with strong cloud expertise on GCP and AWS, he
        designed and implemented core features, optimized data flows, and ensured system
        reliability across environments. He consistently drove improvements in performance,
        architecture, and developer standards, helping the team{' '}
        <b>deliver robust, high-quality solutions</b>. Viktor’s technical leadership and
        attention to detail made a lasting impact on the project’s success.
      </>
    ),
    author: 'Evgen Sylenko',
    company: 'EPAM Systems',
    position: 'Lead Software Engineer',
  },
  {
    quote: (
      <>
        Viktor and I worked together at eMagicOne. He was dedicated to building high-quality
        apps, taking initiative in creating new and improving existing functionality, and
        following best practices. <br />
        Customer focus was very high, providing the best UX/UI and reliable, crash-free apps.
        His contribution was tremendous, leading him to become a Team Lead.
      </>
    ),
    author: 'Andrew Prudyus',
    company: 'eMagicOne',
    position: 'Senior Software Engineer',
  },
  {
    quote: (
      <>
        Viktor has been <b>instrumental</b> in giving OneVision a faster, clearer path from
        idea to shipped feature. He built the engineering team from our first hire,
        establishing pragmatic processes that scaled as we grew. His capstone project was
        helping us <b>replace Zendesk</b> with a custom-built CRM and ticketing application
        that removed vendor constraints,{' '}
        <b>dramatically improved our UX, and increased delivery velocity</b>. <br />
        He is a tremendous asset to any company looking to leverage software to drive better
        business results.
      </>
    ),
    author: 'Jason Griffing',
    company: 'OneVision Resources',
    position: 'Director of Product',
  },
];
