import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 112,
          background: "#0f766e",
        }}
      >
        <svg
          width="360"
          height="360"
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
          <circle cx="218" cy="277" r="20" fill="#f59e0b" />
          <circle cx="297" cy="366" r="20" fill="#f59e0b" />
        </svg>
      </div>
    ),
    size,
  );
}
