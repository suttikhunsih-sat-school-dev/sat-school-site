import localFont from "next/font/local";

export const fcLamoon = localFont({
    src: [
        {
            path: "./fc-lamoon/FC Lamoon Light ver 1.00.ttf",
            weight: "300",
            style: "normal",
        },
        {
            path: "./fc-lamoon/FC Lamoon Regular ver 1.00.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "./fc-lamoon/FC Lamoon Regular Italic ver 1.00.ttf",
            weight: "400",
            style: "italic",
        },
        {
            path: "./fc-lamoon/FC Lamoon Bold ver 1.00.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "./fc-lamoon/FC Lamoon Bold Italic ver 1.00.ttf",
            weight: "700",
            style: "italic",
        },
    ],
    variable: "--font-fc-lamoon",
    display: "swap",
});
