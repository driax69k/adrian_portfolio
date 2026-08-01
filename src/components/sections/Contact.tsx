import {
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { useGSAP } from '@gsap/react';
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  Mail,
  MapPin,
  MessageSquareText,
  Send,
} from 'lucide-react';
import {
  emailComposeUrl,
  personalInfo,
  socialLinks,
} from '../../data/personal';
import { gsap } from '../../utils/gsap';
import { Button } from '../ui/Button';
import { Input, TextArea } from '../ui/Input';
import { SectionHeading } from '../ui/SectionHeading';
import { SocialIcon } from '../ui/SocialIcon';

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;
type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const initialValues: FormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) {
    errors.name = 'Please enter at least two characters.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (values.subject.trim().length < 3) {
    errors.subject = 'Please add a short subject.';
  }
  if (values.message.trim().length < 15) {
    errors.message = 'Please share at least 15 characters.';
  }
  return errors;
};

export const Contact = () => {
  const root = useRef<HTMLElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        if (
          window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
          return;
        }

        gsap.fromTo(
          '.contact-panel',
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.contact-grid',
              start: 'top 80%',
              once: true,
            },
          },
        );
      }, root);

      return () => ctx.revert();
    },
    { scope: root },
  );

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = event.target.name as keyof FormValues;
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (submitState !== 'idle') {
      setSubmitState('idle');
      setSubmitMessage('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitMessage('');

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setSubmitState('submitting');

    const requestController = new AbortController();
    const requestTimeout = window.setTimeout(
      () => requestController.abort(),
      15_000,
    );

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          website: honeypot.current?.value ?? '',
        }),
        signal: requestController.signal,
      });

      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(
          result.message ?? 'The message could not be sent. Please try again.',
        );
      }

      setSubmitState('success');
      setSubmitMessage(
        result.message ?? 'Your message has been sent successfully.',
      );
      setValues(initialValues);
      if (honeypot.current) honeypot.current.value = '';
    } catch (error) {
      const message =
        error instanceof DOMException && error.name === 'AbortError'
          ? 'The request timed out. Please check your connection and try again.'
          : error instanceof Error
            ? error.message
            : 'The message could not be sent. Please try again.';

      setSubmitState('error');
      setSubmitMessage(message);
    } finally {
      window.clearTimeout(requestTimeout);
    }
  };

  return (
    <section
      id="contact"
      ref={root}
      className="relative scroll-mt-20 overflow-hidden border-y border-white/10 bg-canvas-dark px-5 py-24 text-text-on-dark sm:px-8 sm:py-32 lg:px-12"
      aria-labelledby="contact-title"
    >
      <div className="absolute -left-40 top-20 size-[30rem] rounded-full bg-accent/[0.065] blur-[110px]" />
      <div className="absolute -right-40 bottom-0 size-[30rem] rounded-full bg-accent/[0.045] blur-[110px]" />

      <div className="relative mx-auto max-w-[90rem]">
        <SectionHeading
          eyebrow="06 — Contact"
          title="Let’s build something meaningful together."
          description="Have an internship, project, collaboration, or simply a good idea to discuss? I’d be glad to hear about it."
          align="center"
          theme="dark"
        />

        <div className="contact-grid mt-14 grid gap-5 lg:mt-20 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="contact-panel flex flex-col border border-white/15 bg-white/[0.015] p-6 sm:p-8">
            <div className="grid size-12 place-items-center bg-accent">
              <MessageSquareText className="size-5 text-text-on-dark" />
            </div>
            <h3 className="font-display mt-7 text-3xl font-black uppercase tracking-[-0.04em] text-text-on-dark sm:text-4xl">
              Start a conversation.
            </h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-text-muted-on-dark">
              Tell me what you’re working on, what problem you’re trying to
              solve, or where you think I could contribute.
            </p>

            <div className="mt-9 space-y-4">
              <a
                href={emailComposeUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 border border-white/10 bg-white/[0.02] p-4 transition hover:border-accent/50"
              >
                <span className="grid size-10 place-items-center border border-white/10 bg-white/[0.03]">
                  <Mail className="size-4 text-accent" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[0.58rem] uppercase tracking-wider text-text-muted-on-dark">Email</span>
                  <span className="mt-1 block truncate text-sm font-medium text-text-muted-on-dark group-hover:text-text-on-dark">
                    {personalInfo.email}
                  </span>
                </span>
              </a>
              <div className="flex items-center gap-4 border border-white/10 bg-white/[0.02] p-4">
                <span className="grid size-10 place-items-center border border-white/10 bg-white/[0.03]">
                  <MapPin className="size-4 text-accent" />
                </span>
                <span>
                  <span className="block font-mono text-[0.58rem] uppercase tracking-wider text-text-muted-on-dark">Location</span>
                  <span className="mt-1 block text-sm font-medium text-text-muted-on-dark">
                    {personalInfo.location}
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-auto pt-10">
              <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-text-muted-on-dark">
                Elsewhere online
              </p>
              <div className="mt-4 flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target={social.url.startsWith('http') ? '_blank' : undefined}
                    rel={social.url.startsWith('http') ? 'noreferrer' : undefined}
                    className="grid size-11 place-items-center rounded-full border border-white/15 text-text-muted-on-dark transition hover:-translate-y-1 hover:border-accent hover:text-accent"
                    aria-label={social.name}
                  >
                    <SocialIcon name={social.icon} className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form
            className="contact-panel relative border border-white/15 bg-white/[0.015] p-6 sm:p-8"
            onSubmit={handleSubmit}
            noValidate
            aria-busy={submitState === 'submitting'}
          >
            <div
              className="pointer-events-none absolute -left-[9999px] top-auto size-px overflow-hidden opacity-0"
              aria-hidden="true"
            >
              <label htmlFor="website">Website</label>
              <input
                ref={honeypot}
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid gap-x-4 sm:grid-cols-2">
              <Input
                id="name"
                name="name"
                label="Name"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Your name"
                autoComplete="name"
              />
              <Input
                id="email"
                name="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <Input
              id="subject"
              name="subject"
              label="Subject"
              value={values.subject}
              onChange={handleChange}
              error={errors.subject}
              placeholder="What would you like to discuss?"
            />
            <TextArea
              id="message"
              name="message"
              label="Message"
              value={values.message}
              onChange={handleChange}
              error={errors.message}
              placeholder="Tell me a little about the opportunity or project..."
            />

            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-text-muted-on-dark">
                Your message is sent securely to my business email. I&apos;ll
                reply to the address you provide.
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={submitState === 'submitting'}
                icon={
                  submitState === 'submitting' ? (
                    <LoaderCircle className="relative z-10 size-4 animate-spin" />
                  ) : (
                    <Send className="relative z-10 size-4" />
                  )
                }
                className="shrink-0 !border-accent !bg-accent !text-text-on-dark hover:!border-white hover:!bg-white hover:!text-text-on-light"
              >
                {submitState === 'submitting' ? 'Sending...' : 'Send message'}
              </Button>
            </div>

            <div
              className="mt-5 min-h-6"
              role="status"
              aria-live="polite"
            >
              {submitState === 'success' && (
                <p className="flex items-center gap-2 text-sm text-emerald-300">
                  <CheckCircle2 className="size-4" />
                  {submitMessage}
                </p>
              )}
              {submitState === 'error' && (
                <p className="flex items-center gap-2 text-sm text-rose-300">
                  <AlertCircle className="size-4" />
                  {submitMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
