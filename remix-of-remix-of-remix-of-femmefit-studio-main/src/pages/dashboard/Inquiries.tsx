import { Mail, Phone, User2, Inbox, ExternalLink } from "lucide-react";
import { getInquiries, INQUIRY_RECIPIENT, useStoreVersion, buildInquiryMailto } from "@/lib/members-store";
import { Button } from "@/components/ui/button";

const Inquiries = () => {
  useStoreVersion();
  const list = getInquiries();

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <div className="text-xs text-neon tracking-widest uppercase">Admissions</div>
        <h1 className="font-display text-2xl sm:text-3xl mt-1 flex items-center gap-3">
          <Inbox className="w-6 h-6 sm:w-7 sm:h-7 text-neon" /> Admission Inquiries
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          Website ka "Admission" form fill karne wale logon ki inquiries. Forwarded to <span className="text-neon">{INQUIRY_RECIPIENT}</span>.
        </p>
      </div>

      {list.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 text-center">
          <Inbox className="w-12 h-12 text-neon mx-auto mb-3 opacity-60" />
          <h2 className="font-display text-xl">No inquiries yet</h2>
          <p className="text-sm text-muted-foreground mt-2">Jab koi website pa Admission form bhare ga, woh yahan dikhe ga.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((i) => (
            <div key={i.id} className="glass-card rounded-xl p-5">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full grid place-items-center bg-neon/15 text-neon">
                    <User2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{i.name}</div>
                    <div className="text-xs text-muted-foreground">{i.program} · Age {i.age}</div>
                  </div>
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {new Date(i.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 mt-3 text-xs">
                <a href={`mailto:${i.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-neon">
                  <Mail className="w-3.5 h-3.5" /> {i.email}
                </a>
                <a href={`tel:${i.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-neon">
                  <Phone className="w-3.5 h-3.5" /> {i.phone}
                </a>
              </div>
              {i.message && (
                <p className="text-sm text-foreground/80 mt-3 p-3 rounded-lg bg-background/40 border border-border/40">{i.message}</p>
              )}
              <div className="mt-3 flex justify-end">
                <Button size="sm" variant="neon-outline" asChild>
                  <a href={buildInquiryMailto(i)} target="_blank" rel="noreferrer">
                    <ExternalLink className="w-3.5 h-3.5" /> Forward to Admin
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inquiries;
