
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-800 px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <span className="inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
            Welcome to Sacrament Meeting Planner
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Plan and Follow Sacrament Meetings with Ease
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-blue-100">
            A simple and organized way to view upcoming sacrament
            meetings, hymns, prayers, speakers, and announcements.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/meetings/current"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-900 transition hover:bg-blue-100"
            >
              View Current Meeting
            </Link>

            <Link
              href="/meetings"
              className="rounded-lg border border-white/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Browse All Meetings
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Everything You Need in One Place
          </h2>

          <p className="mt-3 text-slate-600">
            Stay informed and prepared for every Sunday service.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 text-3xl" aria-hidden="true">
              📅
            </div>
            <h3 className="text-xl font-semibold text-blue-900">
              Meeting Schedules
            </h3>
            <p className="mt-3 text-slate-600">
              Browse meeting dates and see the planned order of
              service for each Sunday.
            </p>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 text-3xl" aria-hidden="true">
              🎵
            </div>
            <h3 className="text-xl font-semibold text-blue-900">
              Hymns and Speakers
            </h3>
            <p className="mt-3 text-slate-600">
              Find opening, sacrament, and closing hymns alongside
              speaker assignments.
            </p>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 text-3xl" aria-hidden="true">
              📋
            </div>
            <h3 className="text-xl font-semibold text-blue-900">
              Ward Information
            </h3>
            <p className="mt-3 text-slate-600">
              Review announcements, ward business, and other
              important meeting details.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-blue-50 px-6 py-14">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-2xl font-bold text-blue-950">
            Ready for Your Next Sacrament Meeting?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Access meeting programs and stay connected with your
            ward&apos;s Sunday worship schedule.
          </p>

          <Link
            href="/meetings"
            className="mt-6 inline-block rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Explore Meeting Programs
          </Link>
        </div>
      </section>
    </main>
  );
}
