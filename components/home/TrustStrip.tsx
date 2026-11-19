import { Icon } from "@/components/Icon";

const items = [
  { icon: "shield", text: "Independent, never your provider" },
  { icon: "check", text: "No card numbers or passwords, ever" },
  { icon: "phone", text: "We call you back on the number you give" },
] as const;

export function TrustStrip() {
  return (
    <section aria-label="What to expect" className="border-b border-line bg-paper">
      <ul className="container-page grid gap-4 py-5 sm:grid-cols-3">
        {items.map((i) => (
          <li key={i.text} className="flex items-center gap-3 text-[0.9375rem] font-semibold text-navy-900">
            <Icon name={i.icon} className="h-5 w-5 flex-none text-orange-700" />
            {i.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
