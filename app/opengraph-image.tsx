import { ImageResponse } from "next/og";

export const alt = "Sacrament Meeting Planner";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                        "linear-gradient(135deg, #172554, #1e3a8a, #312e81)",
                    color: "#ffffff",
                    padding: "70px",
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        border: "2px solid #bfdbfe",
                        borderRadius: "40px",
                        padding: "15px 35px",
                        fontSize: 25,
                        color: "#dbeafe",
                    }}
                >
                    ORGANIZE • PREPARE • WORSHIP
                </div>

                <div
                    style={{
                        display: "flex",
                        fontSize: 72,
                        fontWeight: 700,
                        marginTop: 40,
                        lineHeight: 1.15,
                    }}
                >
                    Sacrament Meeting Planner
                </div>

                <div
                    style={{
                        display: "flex",
                        fontSize: 32,
                        marginTop: 30,
                        color: "#dbeafe",
                    }}
                >
                    Meeting programs, hymns, prayers and speakers.
                </div>

                <div
                    style={{
                        display: "flex",
                        fontSize: 23,
                        marginTop: 60,
                        color: "#bfdbfe",
                    }}
                >
                    Developed by Nsikak Christopher Eyo
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}