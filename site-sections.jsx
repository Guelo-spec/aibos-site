/* global React */
const { Logo, Button, Badge, Stat, Card, PixelMark } = window.AIBOSDesignSystem_087750;

const MAXW = 1080;
const BOOK_HREF = 'mailto:mlcamero131@gmail.com?subject=AIBOS%20walkthrough';

function Nav() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(250,250,248,0.82)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ maxWidth: MAXW, margin: '0 auto', height: 64, padding: '0 24px', display: 'flex', alignItems: 'center', gap: 28 }}>
        <Logo size={22} />
        <nav className="site-nav-links" style={{ display: 'flex', gap: 24, marginLeft: 16 }}>
          {[['Special Agents', '#agents'], ['How it works', '#how']].map(([l, href]) => (
            <a key={l} href={href} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>{l}</a>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
          <a href={BOOK_HREF} style={{ textDecoration: 'none' }}><Button size="sm">Book a walkthrough</Button></a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border-subtle)' }}>
      {/* pixel-grid texture, very subtle */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(var(--gray-200) 1.2px, transparent 1.2px)', backgroundSize: '22px 22px', maskImage: 'linear-gradient(to bottom, black, transparent 70%)', WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 70%)', opacity: 0.7 }} />
      <div style={{ position: 'relative', maxWidth: MAXW, margin: '0 auto', padding: '84px 24px 72px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 22, maxWidth: '100%' }}>
          <Badge className="hero-badge" variant="neutral" dot>Special Agents — live in Metro Manila businesses today</Badge>
        </div>
        <h1 style={{ fontSize: 'clamp(38px, 6vw, 68px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.04 }}>
          Software you don't operate.<br />Staff you don't hire.
        </h1>
        <p style={{ maxWidth: 600, margin: '22px auto 0', fontSize: 'var(--text-md)', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
          AIBOS gives your business a Special Agent — one AI staffer that runs your POS, payroll, operations, and website on a custom system you own outright. Two are already on the job. Yours is next.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 30, flexWrap: 'wrap' }}>
          <a href="#agents" style={{ textDecoration: 'none' }}><Button size="lg">Meet the agents</Button></a>
          <a href={BOOK_HREF} style={{ textDecoration: 'none' }}><Button size="lg" variant="secondary">Book a walkthrough</Button></a>
        </div>
        <div style={{ marginTop: 18, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', letterSpacing: '.04em' }}>
          NO PER-SEAT FEES · NO LOCK-IN · YOU OWN THE DATABASE
        </div>

        {/* product preview */}
        <div style={{ marginTop: 52, maxWidth: 880, marginLeft: 'auto', marginRight: 'auto' }}>
          <ProductPreview />
        </div>
      </div>
    </section>
  );
}

function ProductPreview() {
  return (
    <div style={{ borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xl)', overflow: 'hidden', background: 'var(--surface-card)', textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-sunken)' }}>
        <span style={{ display: 'flex', gap: 6 }}>
          {['#E2E1DB', '#E2E1DB', '#E2E1DB'].map((c, i) => <span key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="lock" size={11} /> app.bubbleslaundry.ph
        </span>
      </div>
      <div style={{ display: 'flex', minHeight: 280 }}>
        <div className="pv-sidebar" style={{ width: 150, background: 'var(--gray-950)', padding: 14 }}>
          <Logo size={16} tone="inverse" />
          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[['layout-dashboard', 'Overview', true], ['shopping-bag', 'POS', false], ['washing-machine', 'Operations', false], ['wallet', 'Payroll', false]].map(([ic, l, on]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 9px', borderRadius: 6, background: on ? 'rgba(255,255,255,0.08)' : 'transparent', color: on ? 'var(--gray-50)' : 'var(--gray-500)', fontSize: 12, fontWeight: on ? 600 : 500 }}>
                <Icon name={ic} size={14} /> {l}
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, padding: 18 }}>
          <div className="pv-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {[['₱18,420', 'Revenue today'], ['47', 'Orders'], ['6 / 8', 'Machines']].map((s) => (
              <Card key={s[1]} padding="sm"><Stat size="sm" value={s[0]} label={s[1]} /></Card>
            ))}
          </div>
          <Card padding="sm" style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green-500)' }} />
              <span style={{ fontSize: 12, fontWeight: 600 }}>Agent reordered detergent for Machine 3</span>
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)' }}>2m</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

const AGENTS = [
  {
    name: 'Sally',
    awake: [2, 2],
    runs: "Aunt Sally's Laundry",
    vertical: 'Wash & fold · Caloocan',
    replaces: ['Front desk', 'Dispatcher', 'Bookkeeper', 'Payroll clerk', 'Floor supervisor'],
    activity: [
      { t: '2m', text: 'Charged Liza ₱403 for 6.2 kg wash & fold via GCash' },
      { t: '14m', text: 'Assigned a rider to 4 afternoon deliveries' },
      { t: '1h', text: 'Reordered detergent for Machine 3' },
      { t: '3h', text: 'Prepared Friday payroll for 4 staff', wait: true },
    ],
    approval: 'Payments and supplier orders wait for your OK.',
  },
  {
    name: 'Colet',
    awake: [1, 3],
    runs: 'Momnrock Wines',
    vertical: 'Custom wine boxes & printing',
    replaces: ['Order desk', 'Supplier coordinator', 'Courier dispatch', 'Follow-ups'],
    activity: [
      { t: '8m', text: 'Logged a 120-box order from a Makati client' },
      { t: '25m', text: 'Got 2 box-supplier quotes, drafted a PO', wait: true },
      { t: '1h', text: 'Booked Lalamove for tomorrow’s printing pickup' },
      { t: '2h', text: 'Followed up on 3 pending invoices' },
    ],
    approval: 'Every outside action is approved by a human first.',
  },
];

function AgentRow({ a }) {
  return (
    <Card padding="none" style={{ overflow: 'hidden' }}>
      <div className="agent-grid" style={{ display: 'grid', gridTemplateColumns: '312px 1fr' }}>
        {/* Identity */}
        <div className="agent-identity" style={{ padding: '26px 28px', borderRight: '1px solid var(--border-subtle)', background: 'var(--surface-sunken)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <span style={{ display: 'inline-flex', width: 46, height: 46, alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-md)', background: 'var(--surface-card)', border: '1px solid var(--border-subtle)' }}>
              <PixelMark size={26} awake={a.awake} />
            </span>
            <div>
              <div className="aibos-eyebrow" style={{ fontSize: 10 }}>Special Agent</div>
              <div style={{ fontSize: 'var(--text-xl)', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.1 }}>{a.name}</div>
            </div>
            <Badge variant="success" dot style={{ marginLeft: 'auto' }}>Live</Badge>
          </div>

          <div style={{ marginTop: 18, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Runs <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{a.runs}</span>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)', marginTop: 3, letterSpacing: '.03em' }}>{a.vertical}</div>
          </div>

          <div style={{ marginTop: 20 }}>
            <div className="aibos-eyebrow" style={{ fontSize: 10, marginBottom: 9 }}>Replaces a {a.replaces.length}-person team</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {a.replaces.map((r) => (
                <span key={r} style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 9px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-default)', background: 'var(--surface-card)', fontSize: 12, color: 'var(--text-secondary)' }}>{r}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Live activity */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 24px 4px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green-500)' }} />
            <span className="aibos-eyebrow" style={{ fontSize: 10 }}>Working now</span>
          </div>
          <div style={{ padding: '0 24px', flex: 1 }}>
            {a.activity.map((ev, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'baseline', padding: '11px 0', borderBottom: i < a.activity.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)', width: 30, flex: '0 0 30px' }}>{ev.t}</span>
                <span style={{ flex: 1, fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 1.45 }}>{ev.text}</span>
                {ev.wait && <Badge variant="warning">Waiting for your OK</Badge>}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '13px 24px', borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-card)' }}>
            <Icon name="shield-check" size={15} style={{ color: 'var(--text-tertiary)' }} />
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{a.approval}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function Agents() {
  return (
    <section id="agents" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ maxWidth: MAXW, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 44px' }}>
          <div className="aibos-eyebrow">The roster</div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 600, letterSpacing: '-0.025em', marginTop: 12, lineHeight: 1.08 }}>
            Meet the Special Agents.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-md)', marginTop: 16, lineHeight: 1.55 }}>
            You don't log in to run your business — you deploy a Special Agent and it runs the day for you.
            We name them like staff. Each one does the work of a whole team, and every outside action waits for your OK.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {AGENTS.map((a) => <AgentRow key={a.name} a={a} />)}
        </div>
        <p style={{ textAlign: 'center', marginTop: 28, fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
          Two agents already on the job. Yours is named, trained on your business, and live in days.
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ['hammer', 'We build your AIBOS', 'One custom system for your business — POS, operations, payroll, dashboard, website. No off-the-shelf templates.'],
    ['user-check', 'We deploy your Special Agent', 'Named like staff, trained on how your shop actually runs — your prices, your suppliers, your rhythm.'],
    ['shield-check', 'You stay in charge', 'The agent drafts; you approve. Payments, supplier orders, anything that leaves the building waits for your OK.'],
    ['key-round', 'You own all of it', 'The code, the data, the system. No per-seat fees, no lock-in. Live in days, not months.'],
  ];
  return (
    <section id="how" style={{ background: 'var(--surface-card)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ maxWidth: MAXW, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 44px' }}>
          <div className="aibos-eyebrow">How it works</div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 600, letterSpacing: '-0.02em', marginTop: 12 }}>
            From handshake to hired.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
          {steps.map(([ic, title, body], i) => (
            <Card key={title} padding="md">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)' }}>0{i + 1}</span>
                <Icon name={ic} size={17} style={{ color: 'var(--text-secondary)' }} />
              </div>
              <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginTop: 12 }}>{title}</div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: 7 }}>{body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-card)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '76px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 600, letterSpacing: '-0.02em' }}>See it run your shop for a day</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-md)', marginTop: 14, lineHeight: 1.55 }}>
          We set up a working AIBOS for your business — POS, operations, payroll, site — and let your Special Agent run a real day. If it doesn't earn its keep, you owe nothing.
        </p>
        <div style={{ marginTop: 28, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={BOOK_HREF} style={{ textDecoration: 'none' }}><Button size="lg">Book a walkthrough</Button></a>
          <a href="#agents" style={{ textDecoration: 'none' }}><Button size="lg" variant="ghost" iconRight={<Icon name="arrow-right" size={18} />}>See the agents again</Button></a>
        </div>
        <p style={{ marginTop: 18, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', letterSpacing: '.03em' }}>
          or email <a href={BOOK_HREF} style={{ color: 'var(--text-secondary)' }}>mlcamero131@gmail.com</a>
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--surface-page)' }}>
      <div style={{ maxWidth: MAXW, margin: '0 auto', padding: '36px 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <Logo size={18} />
        <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>by JMB Labs · Metro Manila</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 20 }}>
          {[['Special Agents', '#agents'], ['How it works', '#how'], ['Contact', BOOK_HREF]].map(([l, href]) => (
            <a key={l} href={href} style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function Site() {
  useLucide();
  return (
    <div style={{ fontFamily: 'var(--font-sans)', background: 'var(--surface-page)' }}>
      <Nav />
      <Hero />
      <Agents />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}

Object.assign(window, { Site });
