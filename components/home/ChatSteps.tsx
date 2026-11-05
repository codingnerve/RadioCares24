import { SectionHeading } from "@/components/blocks";
import { chatSteps } from "@/lib/content";

/** How it works, drawn as a short conversation. */
export function ChatSteps() {
  return (
    <section id="how-it-works" aria-labelledby="chat-heading" className="px-3 sm:px-4">
      <div className="container-page grid gap-10 rounded-[2.5rem] bg-teal-50 !px-6 py-14 sm:!px-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <SectionHeading
          id="chat-heading"
          eyebrow="How it works"
          title="It's a conversation, not a form-filling maze"
          lead="You describe the problem, we call you back, and you leave knowing exactly what to do next."
        />
        <ol className="space-y-3" aria-label="Example conversation">
          {chatSteps.map((m, i) => (
            <li key={i} className={`flex ${m.from === "you" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[88%] px-5 py-3 leading-relaxed shadow-soft ${
                  m.from === "you"
                    ? "rounded-[1.5rem] rounded-br-md bg-coral-100 text-ink"
                    : "rounded-[1.5rem] rounded-bl-md bg-teal-800 text-white"
                }`}
              >
                <span className="sr-only">{m.from === "you" ? "You: " : "RadioCares24: "}</span>
                {m.text}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
