import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.description}`;

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
          position: "relative",
          overflow: "hidden",
          padding: "76px 82px",
          background:
            "linear-gradient(135deg, #ffffff 0%, #f7f7fb 54%, #efedff 100%)",
          color: "#171b2c",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -150,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(103, 89, 232, 0.12)",
          }}
        />

        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 70,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 710,
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                marginBottom: 30,
                color: "#4d41c9",
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              ALH Science Workspace
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 72,
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: -3,
              }}
            >
              {siteConfig.name}
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 28,
                color: "#63697a",
                fontSize: 32,
                lineHeight: 1.35,
              }}
            >
              Guided calculations, formula practice, experiment
              planning, and laboratory reporting in one workspace.
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 38,
                color: "#6759e8",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              Physics • Chemistry • Laboratory
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: 280,
              height: 280,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 64,
              background: "#6759e8",
              boxShadow: "0 30px 70px rgba(25, 27, 54, 0.18)",
            }}
          >
            <svg
              width="208"
              height="208"
              viewBox="0 0 512 512"
              aria-hidden="true"
            >
              <path
                d="M190 96h132M222 96v112L125 377c-12 21 3 47 27 47h208c24 0 39-26 27-47l-97-169V96"
                fill="none"
                stroke="#ffffff"
                strokeWidth="32"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M166 330h180"
                fill="none"
                stroke="#ffffff"
                strokeWidth="30"
                strokeLinecap="round"
              />
              <circle cx="218" cy="277" r="20" fill="#31b9ae" />
              <circle cx="297" cy="366" r="20" fill="#31b9ae" />
            </svg>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
