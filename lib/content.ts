/**
 * All public-facing copy reused across pages. Claims are deliberately limited to things the site itself
 * demonstrates: no ratings, no testimonials, no hours promises, no guaranteed outcomes.
 */

export type IconName = "key" | "signal" | "grid" | "receipt" | "chat";
export type Accent = "sage" | "sky" | "butter" | "blush";

export type Faq = { q: string; a: string };

export type ServiceContent = {
  slug: string;
  href: string;
  icon: IconName;
  accent: Accent;
  category: "activation" | "signal" | "channels" | "subscription";
  title: string;
  short: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  helpWith: string[];
  beforeYouContact: { title: string; text: string }[];
  nextSteps: string[];
  limits: string[];
  faqs: Faq[];
};

export const services: ServiceContent[] = [
  {
    slug: "radio-activation",
    href: "/radio-activation",
    icon: "key",
    accent: "sage",
    category: "activation",
    title: "Radio activation",
    short:
      "New car, used car or a trial that ran out? We help you find the right details so activating goes smoothly the first time.",
    metaTitle: "Help activating or reactivating a car satellite radio",
    metaDescription:
      "Friendly, independent help with activating or reactivating a car satellite radio: finding the radio ID, getting ready for your provider and knowing what to expect.",
    h1: "Let's get your car's satellite radio activated",
    intro:
      "Your satellite radio provider is the one who switches a receiver on, but most of the stumbling happens before that call. We help you work out what you have, collect the right details and understand each step before you start.",
    helpWith: [
      "Finding the radio ID or serial number your provider will ask for",
      "Telling whether your receiver is built into the car, added later or a portable unit",
      "Getting ready to activate a brand-new or second-hand vehicle",
      "Understanding why a radio that once played now asks for a subscription",
      "Bringing a radio back to life after a trial or plan has ended",
    ],
    beforeYouContact: [
      {
        title: "Write down the radio ID",
        text: "Many receivers show it on a dedicated ID channel (often channel 0) or on a label. Copy it carefully: some letters are never used in IDs, so a lookalike is usually a number.",
      },
      {
        title: "Park somewhere open",
        text: "Activation messages travel from satellites, so try outdoors, away from tall buildings, car parks and thick trees.",
      },
      {
        title: "Keep the radio on",
        text: "Once your provider sends the signal it can take several minutes to arrive. Stay in the car with the radio on while you wait.",
      },
    ],
    nextSteps: [
      "Send us your vehicle and whatever message the radio is showing.",
      "We read it and call you back on the number you gave.",
      "We walk you through what your provider will need, and what to expect from them.",
    ],
    limits: [
      "We can't activate a radio ourselves. Only your provider can.",
      "We can't promise how fast a provider will process a request.",
      "We never need your card details or your account password.",
    ],
    faqs: [
      {
        q: "Can RadioCares24 switch my radio on for me?",
        a: "No. Only your satellite radio provider can activate a receiver. We help you get ready, find the right information and understand the steps, so the call or online request goes smoothly.",
      },
      {
        q: "I bought a used car and the radio is silent. Why?",
        a: "A previous owner's plan almost never carries over. The receiver usually needs a fresh plan or trial from the provider. The radio ID and a clear view of the sky are the best places to start.",
      },
      {
        q: "How long does activation take?",
        a: "That's up to the provider. Many radios wake up within minutes of the signal being sent; some take longer. We don't control the timing and won't pretend to.",
      },
    ],
  },
  {
    slug: "signal-support",
    href: "/signal-support",
    icon: "signal",
    accent: "sky",
    category: "signal",
    title: "Signal & reception",
    short:
      "Cutting out, stuck on “acquiring signal” or silent in a garage? We help you tell normal signal limits from a real equipment problem.",
    metaTitle: "Car satellite radio signal and reception troubleshooting",
    metaDescription:
      "Plain-English help for a satellite radio that cuts out or says acquiring signal: simple checks, what's normal and when to ask an installer to take a look.",
    h1: "Why does my satellite radio keep cutting out?",
    intro:
      "Satellite radio needs a view of the sky, so some dropouts are simply how it works. The real question is whether what you're seeing is normal, a setting or a faulty part. We help you narrow it down.",
    helpWith: [
      "Radios showing “acquiring signal”, “no signal” or something similar",
      "Sound that stops under bridges, in garages and tunnels or between tall buildings",
      "Reception that changed after a new windscreen, roof work or a new accessory",
      "Judging whether the antenna or installation might be at fault",
      "Putting together a clear description for an installer or dealer",
    ],
    beforeYouContact: [
      {
        title: "Try it in the open",
        text: "Drive somewhere with a wide-open sky and leave the radio on for a few minutes. If it plays there, the place was the problem, not the radio.",
      },
      {
        title: "Think about what changed",
        text: "Tinted glass, roof racks, aftermarket antennas and recent repairs can all affect reception. Tell us anything that changed around when it started.",
      },
      {
        title: "Give it a fresh start",
        text: "Switch the car off, open and close the driver's door, wait a minute and start again. It's a safe first step for many one-off glitches.",
      },
    ],
    nextSteps: [
      "Tell us your vehicle, what the radio shows and where it happens.",
      "We reply with a few focused checks and what each result would mean.",
      "If hardware looks likely, we explain what to ask a dealer or installer to inspect.",
    ],
    limits: [
      "We can't repair an antenna or receiver from a distance.",
      "We can't see your car, so we can point to likely causes but not confirm a fault.",
      "Any physical repair is done by a dealer or installer.",
    ],
    faqs: [
      {
        q: "Is it normal for satellite radio to drop out now and then?",
        a: "Yes. Tunnels, covered car parks, thick trees and tall buildings can all block the signal. Some areas also have ground repeaters that help, but coverage varies.",
      },
      {
        q: "My radio says “acquiring signal” everywhere I go.",
        a: "Try an open area first. If it still won't connect, restart the car and think about whether anything near the antenna has changed. If nothing helps, ask an installer to look at the antenna and its cable.",
      },
      {
        q: "Can you fix my antenna?",
        a: "No, we give guidance only. If the checks point to a hardware problem, we tell you what to ask a dealer or installer to look at.",
      },
    ],
  },
  {
    slug: "channel-assistance",
    href: "/channel-assistance",
    icon: "grid",
    accent: "butter",
    category: "channels",
    title: "Missing channels",
    short:
      "Favourite channels vanished or the lineup looks wrong? We help you check the plan, the refresh and what to ask your provider.",
    metaTitle: "Missing satellite radio channels: what to check",
    metaDescription:
      "Why channels disappear from a car satellite radio, what a radio refresh does and how to tell a plan change from a receiver problem.",
    h1: "Where did my satellite radio channels go?",
    intro:
      "The channels you get depend on the plan attached to your radio. When some disappear, it's usually the plan or a waiting refresh rather than the radio itself. We help you tell which.",
    helpWith: [
      "Channels that disappeared when a trial or plan changed",
      "A lineup that doesn't match the plan you thought you had",
      "Understanding what a radio refresh does and when it's worth trying",
      "Getting the right questions ready for your provider about your channel lineup",
    ],
    beforeYouContact: [
      {
        title: "Match it to your plan",
        text: "Look up which plan is on the radio and what it includes. A downgrade or a finished trial removes channels without anything being broken.",
      },
      {
        title: "Ask for a refresh",
        text: "Most providers can send a fresh signal to your radio, usually online or by phone. Leave the radio on, outdoors, while it updates.",
      },
      {
        title: "Check it's the right radio",
        text: "With more than one car or receiver, make sure the radio ID on the account matches the one in the car with the problem.",
      },
    ],
    nextSteps: [
      "Tell us which channels are missing and when you first noticed.",
      "We help you decide whether it points to the plan, a refresh or the receiver.",
      "We tell you exactly what to ask your provider so you only explain it once.",
    ],
    limits: [
      "We can't add or unlock channels. Your provider controls the lineup.",
      "We can't send a refresh signal to your radio.",
      "We can't promise a refresh will bring a channel back.",
    ],
    faqs: [
      {
        q: "What does a radio refresh do?",
        a: "Your provider sends your receiver a message to reload its permissions and lineup. It can fix temporary mismatches, but it can't add channels your plan doesn't include.",
      },
      {
        q: "My channels vanished overnight. Why?",
        a: "Most often the plan on the radio changed, for example a trial ended. A refresh that hasn't arrived yet, or a radio ID that doesn't match the account, can do it too.",
      },
      {
        q: "Can you unlock premium channels for me?",
        a: "No. Your provider and your plan decide what you receive. We can help you understand what a plan includes and what to ask.",
      },
    ],
  },
  {
    slug: "subscription-support",
    href: "/subscription-support",
    icon: "receipt",
    accent: "blush",
    category: "subscription",
    title: "Subscription enquiries",
    short:
      "Not sure what a plan covers, or how to move a radio to another car? We help you understand your options before you speak to the provider.",
    metaTitle: "Satellite radio plans and renewals explained",
    metaDescription:
      "Independent help understanding satellite radio plans, trials, renewals, transfers and cancellations, and getting ready to talk to your provider.",
    h1: "Making sense of your satellite radio plan",
    intro:
      "Plans, trials, renewals and transfers can feel confusing, and the details sit with your provider. We help you understand the terms and walk in prepared, without nudging you toward any plan.",
    helpWith: [
      "Seeing the difference between plan types and what a trial covers",
      "Getting ready to move a radio's service to a different car",
      "Working out what to ask before you renew or change a plan",
      "Knowing how to ask for a cancellation and what to have ready",
      "Reading a bill or renewal notice so you know what to question",
    ],
    beforeYouContact: [
      {
        title: "Gather your account details",
        text: "Your provider will want the radio ID and the account name or email. Share those only with the provider. We never need your password or card details.",
      },
      {
        title: "Read the renewal notice",
        text: "Look for the renewal date, the price once any intro offer ends and how to cancel. Mark anything unclear.",
      },
      {
        title: "Decide what you want",
        text: "Know whether you want to keep, change, move or stop the plan. It makes the conversation with the provider much shorter.",
      },
    ],
    nextSteps: [
      "Tell us what you're trying to do and any renewal or billing details you have.",
      "We reply with a plain-language summary of your options and the questions to ask.",
      "You contact your provider with everything in hand, and you make the decision.",
    ],
    limits: [
      "We can't change, cancel or refund a subscription. Only your provider can.",
      "We don't sell subscriptions on this website and never collect payment details.",
      "We don't give financial or legal advice.",
    ],
    faqs: [
      {
        q: "Can you cancel my subscription?",
        a: "No, cancellations are handled by your provider. We can explain how cancelling usually works and what to have ready so the request goes through smoothly.",
      },
      {
        q: "Do you sell satellite radio plans?",
        a: "Not here. We give independent guidance only, and we never take payments or card details through the enquiry form.",
      },
      {
        q: "Can I move my radio's service to a new car?",
        a: "Providers generally allow it, but the steps and any fees are theirs. We help you collect the radio IDs and know what to ask.",
      },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

/** The four big tiles in the home page picker: "What is your radio doing?" */
export const symptoms: { label: string; hint: string; href: string; accent: Accent; icon: IconName }[] = [
  {
    label: "It won't play or needs activating",
    hint: "New car, used car, or a trial that ended",
    href: "/radio-activation",
    accent: "sage",
    icon: "key",
  },
  {
    label: "It says “acquiring signal”",
    hint: "Or it keeps cutting out",
    href: "/signal-support",
    accent: "sky",
    icon: "signal",
  },
  {
    label: "Channels have gone missing",
    hint: "The lineup changed and I don't know why",
    href: "/channel-assistance",
    accent: "butter",
    icon: "grid",
  },
  {
    label: "I got a renewal I don't understand",
    hint: "Plans, prices, moving or cancelling",
    href: "/subscription-support",
    accent: "blush",
    icon: "receipt",
  },
];

/** "Try this first" strip. */
export const quickChecks = [
  {
    title: "Find some open sky",
    text: "Park away from tall buildings, garages and heavy trees, then give the radio a few minutes.",
  },
  {
    title: "Restart the car",
    text: "Switch off, open and close the driver's door, wait a minute, then start again.",
  },
  {
    title: "Note what the screen says",
    text: "The exact words on the display tell us (and your provider) more than any description.",
  },
] as const;

/** Chat-bubble version of how it works. */
export const chatSteps: { from: "you" | "us"; text: string }[] = [
  {
    from: "you",
    text: "My radio says “acquiring signal” and I'm not sure what to do. It's a 2021 car.",
  },
  {
    from: "us",
    text: "Thanks, that helps. We'll call you back. Here's what it usually means and two quick checks to try.",
  },
  {
    from: "you",
    text: "I tried both and it's still stuck. What do I say to my installer?",
  },
  {
    from: "us",
    text: "Here's exactly what to tell them and what to ask them to inspect. After that, it's in their hands, and you'll know what to expect.",
  },
];

export const weDo = [
  "Explain what your radio is most likely doing, in plain English",
  "Give you checks to try and tell you what each result means",
  "Help you find the radio ID and other details your provider asks for",
  "Write down exactly what to ask your provider or installer",
];

export const weDont = [
  "Activate radios or change, cancel or refund subscriptions",
  "Repair antennas or receivers from a distance",
  "Promise results or timings we don't control",
  "Ask for card numbers or passwords, ever",
];

export const promises = [
  {
    title: "Independent, and upfront about it",
    text: "We aren't your satellite radio provider and don't speak for one. The disclaimer page spells out where our help starts and stops.",
  },
  {
    title: "No cards, no passwords",
    text: "The form has no place for payment details or account passwords, and we will never ask you for them.",
  },
  {
    title: "We call you back",
    text: "Leave your number and we'll ring you, so you don't have to chase us.",
  },
  {
    title: "Your details stay with us",
    text: "What you send goes to our inbox and is used only to answer you. The privacy policy explains how long we keep it and how to ask us to delete it.",
  },
] as const;

export const vehicleInfo = {
  intro:
    "Whether satellite radio works in your car depends on the receiver fitted, not only the make and model. Some cars have one built in, some have one added later and some have none.",
  weNeed: [
    "Vehicle make, model and roughly what year",
    "Whether the radio came with the car or was added later",
    "The radio ID, if you can find it",
    "The exact words or symptom on the screen",
  ],
  honest:
    "We don't publish a list of supported vehicles because a make and model alone can't tell us. Send the details and we'll honestly tell you whether we can help.",
} as const;

export const generalFaqs: Faq[] = [
  {
    q: "Is RadioCares24 a satellite radio provider?",
    a: "No. We're an independent help service. We aren't connected to, endorsed by or approved by any satellite radio provider or car maker. Plans are managed by your provider.",
  },
  {
    q: "What can you actually do for me?",
    a: "We help you understand what's happening, run the right checks and prepare for the right conversation with your provider or installer. We can't activate radios, change plans or fix hardware.",
  },
  {
    q: "Does it cost anything to send an enquiry?",
    a: "No, sending an enquiry through this website is free. If we ever offer something with a fee, we'll tell you the price clearly before you agree to anything.",
  },
  {
    q: "What should I put in my enquiry?",
    a: "Your car's make, model and year, any radio ID you can find, the message on the screen and what you've already tried. The more specific you are, the more useful our reply.",
  },
  {
    q: "Why does my radio say “acquiring signal”?",
    a: "It can't lock onto the satellite signal. Usually the view of the sky is blocked, or there's an antenna or installation fault. Try an open area first.",
  },
  {
    q: "Why did my channels disappear?",
    a: "Most often the plan on the radio changed, for example a trial ended. Asking your provider for a refresh sometimes clears up a temporary mismatch.",
  },
  {
    q: "How do I find my radio ID?",
    a: "Many receivers show it on a dedicated ID channel (often channel 0) or on a label on the unit. Copy it carefully, because some characters are never used in IDs.",
  },
  {
    q: "Will satellite radio work in any car?",
    a: "Not always. It depends on the receiver in the car. Tell us the details and we'll be honest about whether we can help.",
  },
  {
    q: "Do you ever ask for card numbers or passwords?",
    a: "Never. Please don't put them in an enquiry. If anyone asks for them in our name, don't share them, and contact us.",
  },
  {
    q: "What happens to the information I send?",
    a: "It's used only to answer your enquiry and keep a record of it. The privacy policy explains what we keep, for how long and how to ask for deletion.",
  },
];
