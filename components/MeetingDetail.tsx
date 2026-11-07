
import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps) {
  const formattedDate = new Date(
    `${meeting.date}T12:00:00`
  ).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const meetingTypeLabels: Record<
    SacramentMeeting["meetingType"],
    string
  > = {
    regular: "Regular Sacrament Meeting",
    testimony: "Fast and Testimony Meeting",
    stake: "Stake Conference",
    general: "General Conference",
  };

  return (
    <article className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm print:border-0 print:p-0 print:shadow-none md:p-10">
      <header className="mb-8 border-b border-slate-200 pb-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-800">
          Sacrament Meeting Program
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          {formattedDate}
        </h1>

        <p className="mt-3 text-slate-600">
          {meetingTypeLabels[meeting.meetingType]}
        </p>
      </header>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-bold text-blue-900">
          Meeting Leadership
        </h2>

        <div className="space-y-3">
          <p>
            <strong>Presiding:</strong> {meeting.presiding}
          </p>
          <p>
            <strong>Conducting:</strong> {meeting.conducting}
          </p>
        </div>
      </section>

      {meeting.announcements && (
        <section className="mb-8 rounded-lg bg-blue-50 p-5 print:bg-white">
          <h2 className="mb-3 text-xl font-bold text-blue-900">
            Announcements
          </h2>
          <p className="whitespace-pre-line text-slate-700">
            {meeting.announcements}
          </p>
        </section>
      )}

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-bold text-blue-900">
          Opening Exercises
        </h2>

        <div className="space-y-3">
          <p>
            <strong>Opening Hymn:</strong>{" "}
            {meeting.openingHymn.title} (#{meeting.openingHymn.number})
          </p>

          <p>
            <strong>Opening Prayer:</strong>{" "}
            {meeting.openingPrayer}
          </p>
        </div>
      </section>

      {meeting.wardBusiness.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-blue-900">
            Ward Business
          </h2>

          <ul className="list-disc space-y-2 pl-6 text-slate-700">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>
                {typeof item === "string"
                  ? item
                  : JSON.stringify(item)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {meeting.stakeBusiness && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-blue-900">
            Stake Business
          </h2>
          <p className="text-slate-700">
            Stake business will be conducted as part of this meeting.
          </p>
        </section>
      )}

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-bold text-blue-900">
          Sacrament
        </h2>

        <p>
          <strong>Sacrament Hymn:</strong>{" "}
          {meeting.sacramentHymn.title} (#{meeting.sacramentHymn.number})
        </p>
      </section>

      {meeting.speakers.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-blue-900">
            Speakers
          </h2>

          <ul className="space-y-3">
            {meeting.speakers.map((speaker, index) => (
              <li
                key={index}
                className="rounded-lg border border-slate-200 p-4 print:border-0 print:p-1"
              >
                {typeof speaker === "string"
                  ? speaker
                  : JSON.stringify(speaker)}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-xl font-bold text-blue-900">
          Closing Exercises
        </h2>

        <div className="space-y-3">
          <p>
            <strong>Closing Hymn:</strong>{" "}
            {meeting.closingHymn.title} (#{meeting.closingHymn.number})
          </p>

          <p>
            <strong>Closing Prayer:</strong>{" "}
            {meeting.closingPrayer}
          </p>
        </div>
      </section>
    </article>
  );
}
