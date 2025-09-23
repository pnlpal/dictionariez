"use strict";
import "./user-profile.less";
const defaultAvatarSvg = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='75' height='75'><circle cx='37.5' cy='37.5' r='37.5' fill='%23e0e7ef'/><circle cx='37.5' cy='30' r='14' fill='%2390b4fa'/><ellipse cx='37.5' cy='56' rx='19' ry='12' fill='%2390b4fa'/></svg>`;
async function loadImage(url) {
    const picRes = await fetch(url, { credentials: "include" });
    const blob = await picRes.blob();
    return URL.createObjectURL(blob);
}
function letterAvatar(letter, bg = "#90b4fa", color = "#fff") {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='75' height='75'>
        <circle cx='37.5' cy='37.5' r='37.5' fill='${bg}'/>
        <text x='50%' y='50%' text-anchor='middle' font-size='36' fill='${color}' font-family='Arial, sans-serif' dominant-baseline="middle" dy=".15em">${letter}</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default async ($scope) => {
    const pnlBase = "https://pnl.dev";
    const meRes = await fetch(`${pnlBase}/api/me`, { credentials: "include" });
    if (meRes.ok) {
        const userslug = await meRes.json();
        const userRes = await fetch(`${pnlBase}/api${userslug}`);
        const user = await userRes.json();
        user.isPro = user.proStatus === "active";
        user.link = `${pnlBase}/user/${user.userslug}`;
        user.subscriptionLink = `${pnlBase}/pro`;
        if (user.picture) {
            user.pictureUrl = await loadImage(`${pnlBase}${user.picture}`);
        } else {
            const firstLetter = user.username ? user.username.charAt(0).toUpperCase() : "U";
            user.pictureUrl = letterAvatar(firstLetter, "#90b4fa", "#fff");
        }

        $scope.user = user;
    } else {
        $scope.user = {
            loggedIn: false,
            username: "Login / Sign up",
            pictureUrl: defaultAvatarSvg,
            isPro: false,
            link: `${pnlBase}/login`,
            subscriptionLink: `${pnlBase}/pro`,
        };
    }
    $scope.$apply();
};
