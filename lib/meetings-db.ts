
import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: "2026-10-11",
        meetingType: "regular",
        presiding: "Bishop Daniel Johnson",
        conducting: "Brother Michael Adams",
        announcements: [
            "Ward council meeting after church.",
            "Youth activity on Wednesday at 5:00 PM.",
        ],
        openingHymn: { number: 2, title: "The Spirit of God" },
        openingPrayer: "Sister Grace Williams",
        wardBusiness: [{ description: "Welcome new ward members." }],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
        speakers: [
            {
                name: "Brother James Brown",
                topic: "Faith in Jesus Christ",
                type: "speaker",
            },
            {
                name: "Ward Choir",
                topic: "Special Musical Number",
                type: "musical-number",
            },
        ],
        closingHymn: { number: 152, title: "God Be with You Till We Meet Again" },
        closingPrayer: "Brother Peter Wilson",
    },
    {
        id: 2,
        date: "2026-10-18",
        meetingType: "regular",
        presiding: "Bishop Daniel Johnson",
        conducting: "Brother Michael Adams",
        announcements: ["Relief Society service project on Saturday."],
        openingHymn: { number: 85, title: "How Firm a Foundation" },
        openingPrayer: "Brother David Smith",
        wardBusiness: [{ description: "Recognition of new ward callings." }],
        stakeBusiness: false,
        sacramentHymn: { number: 170, title: "God, Our Father, Hear Us Pray" },
        speakers: [
            {
                name: "Sister Mary Johnson",
                topic: "The Importance of Prayer",
                type: "speaker",
            },
        ],
        closingHymn: { number: 134, title: "I Believe in Christ" },
        closingPrayer: "Sister Sarah Thomas",
    },
    {
        id: 3,
        date: "2026-10-25",
        meetingType: "regular",
        presiding: "Bishop Daniel Johnson",
        conducting: "Brother Samuel Clark",
        announcements: ["Temple preparation class begins next Sunday."],
        openingHymn: { number: 116, title: "Come, Follow Me" },
        openingPrayer: "Sister Hannah Miller",
        wardBusiness: [{ description: "Ward missionary update." }],
        stakeBusiness: false,
        sacramentHymn: { number: 172, title: "In Humility, Our Savior" },
        speakers: [
            {
                name: "Brother Joseph White",
                topic: "Service and Charity",
                type: "speaker",
            },
        ],
        closingHymn: { number: 98, title: "I Need Thee Every Hour" },
        closingPrayer: "Brother Mark Davis",
    },
    {
        id: 4,
        date: "2026-11-01",
        meetingType: "testimony",
        presiding: "Bishop Daniel Johnson",
        conducting: "Brother Michael Adams",
        announcements: ["Fast offerings will be collected today."],
        openingHymn: { number: 6, title: "Redeemer of Israel" },
        openingPrayer: "Sister Rebecca Wilson",
        wardBusiness: [{ description: "Welcome visiting members." }],
        stakeBusiness: false,
        sacramentHymn: { number: 175, title: "O God, the Eternal Father" },
        speakers: [
            {
                name: "Ward Members",
                topic: "Fast and Testimony Meeting",
                type: "speaker",
            },
        ],
        closingHymn: { number: 124, title: "Be Still, My Soul" },
        closingPrayer: "Brother John Miller",
    },
    {
        id: 5,
        date: "2026-11-08",
        meetingType: "regular",
        presiding: "Bishop Daniel Johnson",
        conducting: "Brother Samuel Clark",
        announcements: [
            "Ward activity scheduled for Saturday.",
            "Members are encouraged to participate in ministering visits.",
        ],
        openingHymn: { number: 3, title: "Now Let Us Rejoice" },
        openingPrayer: "Sister Elizabeth Brown",
        wardBusiness: [{ description: "Announcements of new assignments." }],
        stakeBusiness: false,
        sacramentHymn: { number: 173, title: "While of These Emblems We Partake" },
        speakers: [
            {
                name: "Brother Andrew Taylor",
                topic: "Following the Savior",
                type: "speaker",
            },
            {
                name: "Sister Rachel Adams",
                topic: "Strengthening Our Families",
                type: "speaker",
            },
        ],
        closingHymn: { number: 301, title: "I Am a Child of God" },
        closingPrayer: "Brother Thomas Green",
    },
];

export function getMeetings(): SacramentMeeting[] {
    return [...meetings].sort((a, b) => b.date.localeCompare(a.date));
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
    return meetings.find((meeting) => meeting.id === id);
}

export function getMeetingByDate(
    date: string
): SacramentMeeting | undefined {
    return meetings.find((meeting) => meeting.date === date);
}
