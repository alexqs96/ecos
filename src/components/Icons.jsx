export function EcosLogo({ size, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || "1em"}
      height={size || "1em"}
      viewBox="0 0 48 48"
      className={"flow " + (className || "")}
    >
      <path d="M45.7,36.9c-3.8-6.4-12.3-12.7-18.6-15.2a12.8,12.8,0,0,0-3.4-1c-1.7-.2-2.5-1.4-2.2-2.5s.8-1.4,1.9-1.3c3,.4,7.7,2.3,12.2,5.2l.9.6.3.2,1.2.8a1,1,0,0,0,1.6-.9c-.6-4.7-2.1-9.4-6.5-12.4S21.2,8,14,9.2a80.6,80.6,0,0,1-9.7,1.3H3a.9.9,0,0,0-.9,1.3l.4,1.2c3.1,9.4,7.4,22.3,17.8,25.4a17.4,17.4,0,0,0,4.5.6A19.5,19.5,0,0,0,38,33.7,29.4,29.4,0,0,1,42.3,39,1.9,1.9,0,0,0,44,40a2.2,2.2,0,0,0,1.3-.4A2.1,2.1,0,0,0,45.7,36.9Z" />
    </svg>
  );
}

export function CalendarIcon({ size, className }) {
  return (
    <svg
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      className={className || undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3ZM19 19H5V8H19V19Z" />
    </svg>
  );
}

export function CommunityIcon({ size, className }) {
  return (
    <svg
      width={size || "1em"}
      height={size || "1em"}
      viewBox="0 0 24 24"
      className={className || undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 5.5C12.9283 5.5 13.8185 5.86875 14.4749 6.52513C15.1313 7.1815 15.5 8.07174 15.5 9C15.5 9.92826 15.1313 10.8185 14.4749 11.4749C13.8185 12.1313 12.9283 12.5 12 12.5C11.0717 12.5 10.1815 12.1313 9.52513 11.4749C8.86875 10.8185 8.5 9.92826 8.5 9C8.5 8.07174 8.86875 7.1815 9.52513 6.52513C10.1815 5.86875 11.0717 5.5 12 5.5ZM5 8C5.56 8 6.08 8.15 6.53 8.42C6.38 9.85 6.8 11.27 7.66 12.38C7.16 13.34 6.16 14 5 14C4.20435 14 3.44129 13.6839 2.87868 13.1213C2.31607 12.5587 2 11.7956 2 11C2 10.2044 2.31607 9.44129 2.87868 8.87868C3.44129 8.31607 4.20435 8 5 8ZM19 8C19.7956 8 20.5587 8.31607 21.1213 8.87868C21.6839 9.44129 22 10.2044 22 11C22 11.7956 21.6839 12.5587 21.1213 13.1213C20.5587 13.6839 19.7956 14 19 14C17.84 14 16.84 13.34 16.34 12.38C17.2 11.27 17.62 9.85 17.47 8.42C17.92 8.15 18.44 8 19 8ZM5.5 18.25C5.5 16.18 8.41 14.5 12 14.5C15.59 14.5 18.5 16.18 18.5 18.25V20H5.5V18.25ZM0 20V18.5C0 17.11 1.89 15.94 4.45 15.6C3.86 16.28 3.5 17.22 3.5 18.25V20H0ZM24 20H20.5V18.25C20.5 17.22 20.14 16.28 19.55 15.6C22.11 15.94 24 17.11 24 18.5V20Z" />
    </svg>
  );
}

export function MailIcon({ size, className }) {
  return (
    <svg
      width={size || "1em"}
      height={size || "1em"}
      viewBox="0 0 24 24"
      className={className || undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 8L12 13L4 8V6L12 11L20 6M20 4H4C2.89 4 2 4.89 2 6V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V6C22 4.89 21.1 4 20 4Z" />
    </svg>
  );
}

export function FilterIcon({ size, className }) {
  return (
    <svg
      width={size || "1em"}
      height={size || "1em"}
      viewBox="0 0 24 24"
      className={className || undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14.0001 12V19.88C14.0401 20.18 13.9401 20.5 13.7101 20.71C13.3201 21.1 12.6901 21.1 12.3001 20.71L10.2901 18.7C10.0601 18.47 9.9601 18.16 10.0001 17.87V12H9.9701L4.2101 4.62C3.8701 4.19 3.9501 3.56 4.3801 3.22C4.5701 3.08 4.7801 3 5.0001 3H19.0001C19.2201 3 19.4301 3.08 19.6201 3.22C20.0501 3.56 20.1301 4.19 19.7901 4.62L14.0301 12H14.0001Z" />
    </svg>
  );
}

export function GardenIcon({ size, className }) {
  return (
    <svg
      width={size || "1em"}
      height={size || "1em"}
      viewBox="0 0 24 24"
      className={className || undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4V8H14V4H10ZM16 4V8H20V4H16ZM16 10V14H20V10H16ZM16 16V20H20V16H16ZM14 20V16H10V20H14ZM8 20V16H4V20H8ZM8 14V10H4V14H8ZM8 8V4H4V8H8ZM10 14H14V10H10V14ZM4 2H20C20.5304 2 21.0391 2.21071 21.4142 2.58579C21.7893 2.96086 22 3.46957 22 4V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22H4C2.92 22 2 21.1 2 20V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2Z" />
    </svg>
  );
}

export function HeartIcon({ size, className }) {
  return (
    <svg
      width={size || "1em"}
      height={size || "1em"}
      viewBox="0 0 24 24"
      className={className || undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" />
    </svg>
  );
}

export function LightBulbIcon({ size, className }) {
  return (
    <svg
      width={size || "1em"}
      height={size || "1em"}
      viewBox="0 0 24 24"
      className={className || undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 11H23V13H20V11ZM1 11H4V13H1V11ZM13 1V4H11V1H13ZM4.92 3.5L7.05 5.64L5.63 7.05L3.5 4.93L4.92 3.5ZM16.95 5.63L19.07 3.5L20.5 4.93L18.37 7.05L16.95 5.63ZM12 6C13.5913 6 15.1174 6.63214 16.2426 7.75736C17.3679 8.88258 18 10.4087 18 12C18 14.22 16.79 16.16 15 17.2V19C15 19.2652 14.8946 19.5196 14.7071 19.7071C14.5196 19.8946 14.2652 20 14 20H10C9.73478 20 9.48043 19.8946 9.29289 19.7071C9.10536 19.5196 9 19.2652 9 19V17.2C7.21 16.16 6 14.22 6 12C6 10.4087 6.63214 8.88258 7.75736 7.75736C8.88258 6.63214 10.4087 6 12 6ZM14 21V22C14 22.2652 13.8946 22.5196 13.7071 22.7071C13.5196 22.8946 13.2652 23 13 23H11C10.7348 23 10.4804 22.8946 10.2929 22.7071C10.1054 22.5196 10 22.2652 10 22V21H14ZM11 18H13V15.87C14.73 15.43 16 13.86 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17157C14.0783 8.42143 13.0609 8 12 8C10.9391 8 9.92172 8.42143 9.17157 9.17157C8.42143 9.92172 8 10.9391 8 12C8 13.86 9.27 15.43 11 15.87V18Z" />
    </svg>
  );
}

export function MessageIcon({ size, className }) {
  return (
    <svg
      width={size || "1em"}
      height={size || "1em"}
      viewBox="0 0 24 24"
      className={className || undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 2H4C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V22L6 18H20C20.5304 18 21.0391 17.7893 21.4142 17.4142C21.7893 17.0391 22 16.5304 22 16V4C22 2.89 21.1 2 20 2Z" />
    </svg>
  );
}

export function PlantIcon({ size, className }) {
  return (
    <svg
      width={size || "1em"}
      height={size || "1em"}
      viewBox="0 0 24 24"
      className={className || undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_487_421)">
        <path d="M22.9999 4.1V2.3L21.1999 2.1C21.0999 2.1 20.4999 2 19.4999 2C15.3999 2 12.3999 3.2 10.6999 5.3C9.3999 4.5 7.5999 4 5.4999 4C4.4999 4 3.7999 4.1 3.7999 4.1L1.8999 4.4L1.9999 6.1C2.0999 9.1 3.5999 14.8 8.7999 14.8C8.8999 14.8 8.8999 14.8 8.9999 14.8V18.2C5.1999 18.7 1.9999 20 1.9999 20V22H21.9999V20C21.9999 20 18.7999 18.7 14.9999 18.2V15C21.2999 14.9 22.9999 7.8 22.9999 4.1ZM11.9999 18C11.6999 18 11.2999 18 10.9999 18V12.4C10.9999 12.4 10.7999 9 7.9999 9C7.9999 9 9.4999 9.8 9.8999 12.7C9.4999 12.8 9.0999 12.8 8.7999 12.8C4.1999 12.8 3.9999 6.1 3.9999 6.1C3.9999 6.1 4.5999 6 5.4999 6C7.3999 6 10.4999 6.4 11.3999 9.1C11.8999 4.6 16.9999 4 19.4999 4C20.3999 4 20.9999 4.1 20.9999 4.1C20.9999 4.1 20.9999 13.1 14.6999 13.1C14.4999 13.1 14.1999 13.1 13.9999 13.1C13.9999 11.1 15.9999 8.1 15.9999 8.1C12.9999 9.1 12.9999 13 12.9999 13V18C12.6999 18 12.2999 18 11.9999 18Z" />
      </g>
      <defs>
        <clipPath id="clip0_487_421">
          <rect width={size || "1em"} height={size || "1em"} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function ProfileIcon({ size, className }) {
  return (
    <svg
      width={size || "1em"}
      height={size || "1em"}
      viewBox="0 0 24 24"
      className={className || undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 4C13.0609 4 14.0783 4.42143 14.8284 5.17157C15.5786 5.92172 16 6.93913 16 8C16 9.06087 15.5786 10.0783 14.8284 10.8284C14.0783 11.5786 13.0609 12 12 12C10.9391 12 9.92172 11.5786 9.17157 10.8284C8.42143 10.0783 8 9.06087 8 8C8 6.93913 8.42143 5.92172 9.17157 5.17157C9.92172 4.42143 10.9391 4 12 4ZM12 14C16.42 14 20 15.79 20 18V20H4V18C4 15.79 7.58 14 12 14Z" />
    </svg>
  );
}

export function ShareIcon({ size, className }) {
  return (
    <svg
      width={size || "1em"}
      height={size || "1em"}
      viewBox="0 0 24 24"
      className={className || undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C18.7956 8 19.5587 7.68393 20.1213 7.12132C20.6839 6.55871 21 5.79565 21 5C21 4.20435 20.6839 3.44129 20.1213 2.87868C19.5587 2.31607 18.7956 2 18 2C17.2044 2 16.4413 2.31607 15.8787 2.87868C15.3161 3.44129 15 4.20435 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C5.20435 9 4.44129 9.31607 3.87868 9.87868C3.31607 10.4413 3 11.2044 3 12C3 12.7956 3.31607 13.5587 3.87868 14.1213C4.44129 14.6839 5.20435 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.91 18 21.91C19.61 21.91 20.92 20.61 20.92 19C20.92 18.2256 20.6124 17.4829 20.0648 16.9352C19.5171 16.3876 18.7744 16.08 18 16.08Z" />
    </svg>
  );
}

export function TradeIcon({ size, className }) {
  return (
    <svg
      width={size || "1em"}
      height={size || "1em"}
      viewBox="0 0 24 24"
      className={className || undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 8L16 12H19C19 15.31 16.31 18 13 18C12 18 11.03 17.75 10.2 17.3L8.74 18.76C9.97 19.54 11.43 20 13 20C17.42 20 21 16.42 21 12H24M7 12C7 8.69 9.69 6 13 6C14 6 14.97 6.25 15.8 6.7L17.26 5.24C16.03 4.46 14.57 4 13 4C8.58 4 5 7.58 5 12H2L6 16L10 12M15 12C15 13.11 14.11 14 13 14C11.89 14 11 13.11 11 12C11 10.89 11.9 10 13 10C14.1 10 15 10.9 15 12Z" />
    </svg>
  );
}

export function LogoutIcon({ size, className }) {
  return (
    <svg
      width={size || "1em"}
      height={size || "1em"}
      viewBox="0 0 24 24"
      className={className || undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.92 8.41L7.33 11L17 11L17 13L7.33 13L9.92 15.59L8.5 17L3.5 12L8.5 7L9.92 8.41ZM5 21C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19L3 14.33L5 16.33L5 19L19 19L19 5L5 5L5 7.67L3 9.67L3 5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21072 4.46957 3 5 3L19 3C20.11 3 21 3.9 21 5L21 19C21 20.11 20.11 21 19 21L5 21Z" />
    </svg>
  );
}

export function ArrowLeft({ size, className }) {
  return (
    <svg
      width={size || "1em"}
      height={size || "1em"}
      viewBox="0 0 24 24"
      className={className || undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M26.6669 14.6667V17.3333H10.6669L18.0002 24.6667L16.1069 26.56L5.54688 16L16.1069 5.44L18.0002 7.33334L10.6669 14.6667H26.6669Z" />
    </svg>
  );
}

export function ChevronIcon({ size, className }) {
  return (
    <svg
      width={size || "1em"}
      height={size || "1em"}
      viewBox="0 0 16 11"
      className={className || undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1.88 0.439941L8 6.55994L14.12 0.439941L16 2.33327L8 10.3333L0 2.33327L1.88 0.439941Z" fill="black"/>
    </svg>
  );
}

export function TomateIcon({ size, props }) {
  return (
    <svg
      width={size || "5em"}
      height={size || "5em"}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 62.94 63.85"
    >
      <path
        d="M47.85,36.92c-5.02-1.1-8.87-3.48-13.53-5.48-2.01-.86-4.19-1.29-6.16-2.22-1.17-.55-5.72-3.39-5.68-3.24-1.68-7.53-13.25-4.35-11.57,3.19,1.33,6,9.51,10.07,14.8,11.94,6.48,2.29,12.16,5.89,18.95,7.38,7.53,1.66,10.74-9.91,3.19-11.57h0Z"
        fill="#e5261c"
      />
      <path
        d="M47.07,42.49c-2.2,2.01-4.95,4.94-8.15,4.95-2.78,.01-6.4-1.99-8.78-3.23-3.5-1.83-6.29-4.54-9.39-6.95-1.23-.95-6.27-3.28-6.76-4.65-.56-1.59,1.69-3.2,2.9-3.69,2.2-.88,4.18,.05,6.34,.43,3.3,.59,5.48-.02,8.39-1.48,3.71-1.86,7.18-3.36,11.36-3.85l-1.6-11.79c-4.64,.9-8.9,2.36-12.7,5.39-3.59,2.85-7.47,5.27-7.68,10.26-.12,2.78,1.97,4.91,4.4,5.79,2.22,.8,5,.56,7.33,.52,1.15-.02,2.3-.08,3.45-.08,.86-.02,1.72,0,2.58,.06,1.37,.27,1.24-.15-.4-1.25l-.6-4.62c-.2,1.46-2.07,3.49-2.9,4.76-2.9,4.46,1.89,10.17,6.78,8.81,8.31-2.31,10.28-9.91,11.32-17.52,.51-3.77,.09-7.5-2.85-10.27s-6.65-1.72-10.27-2.66c-7.48-1.94-10.67,9.61-3.19,11.57,2.21,.58,4.39,1.13,6.46,2.13,6.93,3.33,13.02-7.01,6.06-10.36-3.02-1.45-6.08-2.48-9.33-3.34l-3.19,11.57c1.46,.38,2.95,.69,4.46,.81,.97,.11,1.95,.13,2.92,.06-1.89-2.31-2.85-2.65-2.87-1.02-1.22,1.96,.34,6.62-2.7,7.46l6.78,8.81c3.06-4.7,7.16-10.9,.91-15.17-2.33-1.59-5.51-1.72-8.23-1.82s-6.76,.91-9.31-.02l4.4,5.79c-.11,2.57-.17,1.92,1.81,.31,1.04-.84,1.65-1.28,2.81-1.96,2.51-1.48,4.1-1.88,6.96-2.43,6.55-1.27,5.16-12.58-1.6-11.79-5.87,.69-10.47,2.76-15.94,4.66-1.39,.49-1.4,.58-2.87,.49-1.08-.07-2.18-.43-3.27-.53-2.03-.18-4.13-.06-6.12,.41C6.23,19.1-.45,28.21,2.85,36.98c1.83,4.87,6.91,6.8,10.75,9.8,4.48,3.49,8.37,6.95,13.64,9.25,4.77,2.08,9.43,4.09,14.74,3.08s9.63-4.53,13.59-8.15c5.71-5.22-2.79-13.69-8.49-8.49h0v.02Z"
        fill="#e5261c"
      />
      <path
        d="M44,23.56l3.3,3.3c4.76,4.76,13.03-1.38,9.42-7.27l-1.3-2.12c-3.14,2.42-6.28,4.85-9.42,7.27,1.34,1.71,2.42,3.58,3.45,5.5,3.23,6.01,12.82,1.9,10.97-4.62-.88-3.1-2.34-5.62-4.82-7.72-4.05-3.41-9.89-1.13-10.24,4.24-.23,3.5,1.85,5.81,3.18,8.78,1.46,3.27,1.34,6.68,2.92,9.92l2.15-8.21c-1.87,1.44-2.82,2.72-3.55,4.97-.86,2.65-1.13,2.52-3.82,4.25l9.03,5.18c-.1-2.05-.14-4.11-.29-6.16-.06-.79-.32-7.39-.85-3.51l-2.76,3.59c1.96-1.48,4.65-1.48,6.6-3.02,1.95-1.54,2.64-4.14,3.35-6.5l-10.03,2.65,.8,.99-1.76-4.24,.06,1.27,9.03-5.18-.42-.24,2.76,3.59c-.51-1.46-.61-3.12-.86-4.65-1.24-7.6-12.81-4.38-11.57,3.19,.55,3.37,.74,6.61,4.04,8.47,3.79,2.14,9.26-.52,9.03-5.18-.14-2.85-.86-4.34-2.62-6.5-2.99-3.66-8.83-1.31-10.03,2.65-.66,2.19-.27,.21,.49,.07-1.07,.19-2.53,.9-3.51,1.42-1.9,1.01-3.48,2.3-4.17,4.44-.55,1.7-.1,3.26,.15,4.93,.4,2.63,.44,5.29,.56,7.94,.21,4.33,5.01,7.76,9.03,5.18,2.44-1.57,5.15-2.98,6.87-5.38,.76-1.07,1.32-2.2,1.75-3.45,.72-2.08,1.68-2.64-1.25-.38,2.72-2.1,3.73-4.97,2.15-8.21-.39-.79-.17-2.92-.35-3.74-.33-1.56-1-2.66-1.62-4.11-.46-1.08-.64-2.21-1.2-3.27l-.73-1.09c-1.02-1.5-1.21-1.64-.57-.44l-10.24,4.24c.99,.51,1.57,1.32,1.73,2.42l10.97-4.62c-1.53-2.85-3.33-5.39-5.33-7.93-4.24-5.4-12.93,1.55-9.42,7.27l1.3,2.12c3.14-2.42,6.28-4.85,9.42-7.27l-3.3-3.3c-5.47-5.47-13.95,3.01-8.49,8.49h0v-.02Z"
        fill="#e5261c"
      />
      <path
        d="M36.1,40.05c.39,1.74-1.74,5.51-2.96,5.48-1.65-.04-5.47-4.58-6.75-6.01l-4.24,10.24c3.07-.12,5.77-.17,8.69,.9l3.19-11.57c-.66-.17-1.33-.35-1.99-.52-7.47-1.97-10.66,9.6-3.19,11.57,.66,.17,1.33,.35,1.99,.52,7.58,2,10.33-8.93,3.19-11.57-3.82-1.41-7.85-1.48-11.88-1.33-5.33,.2-7.74,6.35-4.24,10.24,4.97,5.53,12.84,12.26,20.69,8.22,6.92-3.56,10.75-11.86,9.08-19.36-1.67-7.54-13.25-4.35-11.57,3.19h-.01Z"
        fill="#e5261c"
      />
      <path
        d="M36.57,11.72c-5.4,2.19-10.97,4.08-16.82,3.71-5.46-.35-9.38,2.1-12.76,6.23l10.03,5.84c-1.14,1.31-1.04,1.55,.3,.72l-6.06-10.36C3.21,21.71-1.21,29.57,.56,38.49c1.71,8.61,6.89,15.17,13.87,20.01l3.03-11.18,.4,.04c-5.69-3.35-12.66,4.99-7.27,9.42,7.57,6.22,16.99,8.02,26.5,5.53,9.68-2.53,17.86-6.35,21.73-16,2.87-7.17-8.73-10.28-11.57-3.19-1.96,4.88-8.71,6.43-13.35,7.62-5.03,1.29-10.7,.95-14.83-2.45l-7.27,9.42c1.92,1.13,3.44,1.5,5.65,1.6,6.38,.3,7.57-8.03,3.03-11.18-3.56-2.47-5.79-5.24-7.4-9.42-1.96-5.08-.48-8.24,4.23-10.5,7.03-3.37,.89-13.43-6.06-10.36-2.99,1.32-4.84,3.31-5.81,6.45-1.68,5.47,6.16,10.57,10.03,5.84,.92-1.12,1.82-2.54,3.24-2.85,2.06-.45,4.88,.33,7.11-.02,4.81-.75,9.43-2.16,13.93-3.98,7.06-2.86,3.98-14.48-3.19-11.57h0Z"
        fill="#e5261c"
      />
      <path
        d="M20,15.92c-.2-.04-.39-.08-.58-.11-5.7-.89-13.52,4.17-16.76,10.83-3.37,6.92-.8,13.93,.74,18.11,.82,2.25,3.33,9.1,10.34,13.74,5.01,3.32,9.98,3.91,11.86,4.14,5.11,.6,9.03-.33,11.9-1.02,4.62-1.11,10.95-2.62,16.23-8.09,3.61-3.74,5.12-7.62,5.93-9.7,.96-2.47,3.2-8.24,1.82-15.14-.42-2.07-1.22-3.81-2.83-7.29,0-.02-.98-1.99-5.53-5.94l-8.14-3.03c-1.12-.19-2.7-.34-4.57-.11-2.19,.28-3.89,.97-5,1.52-.07-.17-.14-.34-.2-.51,.97-.64,2.73-1.64,5.16-2.03,2.02-.33,3.7-.11,4.77,.11l.13,.03,8.45,3.18c4.83,4.18,5.82,6.26,5.86,6.34,1.64,3.55,2.46,5.33,2.9,7.52,1.44,7.2-.88,13.17-1.87,15.72-.84,2.15-2.39,6.16-6.15,10.05-5.49,5.68-11.98,7.23-16.72,8.37-2.27,.54-5.2,1.24-8.85,1.24-1.07,0-2.21-.06-3.41-.2-1.94-.23-7.08-.85-12.3-4.3-7.29-4.83-9.89-11.91-10.74-14.24-1.49-4.06-4.26-11.6-.7-18.92,3.09-6.36,11-12.45,17.84-11.39,.42,.07,.88,.17,1.39,.28,.02,0,.04,0,.05,.01"
        fill="#1d1d1b"
      />
      <path
        d="M25.17,11.13c-.9-.15-2.54-.27-4.25,.5-2.81,1.27-4.81,4.51-4.07,5.67,.73,1.14,4.33,.62,6.82-.82,1.93-1.12,2.12-2.17,3.14-2.06,1.43,.16,1.8,2.32,4.91,5.62,1.27,1.35,1.67,1.47,1.91,1.37,1.09-.44-.9-5.35,.82-6.58,.69-.5,1.45-.01,6.28,.96,2.61,.53,2.98,.5,3.14,.27,.59-.84-1.55-4.5-4.81-5.62-3.5-1.2-6.26,1.23-7.34,0-1.46-1.66,3.19-6.58,1.5-8.91-.88-1.21-3.11-1.23-4.5-.69-2.79,1.09-4.5,5.26-3.55,10.29Z"
        fill="#acd296"
        stroke="#1d1d1b"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

