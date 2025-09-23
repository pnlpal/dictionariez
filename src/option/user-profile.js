"use strict";
import "./user-profile.less";

async function loadImage(url) {
    const picRes = await fetch(url, { credentials: "include" });
    const blob = await picRes.blob();
    return URL.createObjectURL(blob);
}

export default async ($scope) => {
    const pnlBase = "https://pnl.dev";
    const meRes = await fetch(`${pnlBase}/api/me`, { credentials: "include" });
    const userslug = await meRes.json();
    if (userslug) {
        const userRes = await fetch(`${pnlBase}/api${userslug}`);
        const user = await userRes.json();
        user.isPro = user.proStatus === "active";
        user.link = `${pnlBase}/user/${user.userslug}`;
        user.subscriptionLink = `${pnlBase}/pro`;
        if (user.picture) {
            user.pictureUrl = await loadImage(`${pnlBase}${user.picture}`);
        }

        console.log(user);
        $scope.user = user;
    }
    $scope.$apply();
};
