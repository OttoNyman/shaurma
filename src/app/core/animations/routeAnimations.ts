import { transition, trigger, useAnimation } from "@angular/animations";
import { fadeAnimation } from "./fade.animation";
import { fadeScrollAnimation } from "./fadeScroll.animation";

export const rootAnimation = trigger('rootRouteAnimations', [
    transition('sign <=> login', useAnimation(fadeScrollAnimation, {params: {hideOffset: '300px', showOffset: '-300px'}})),
    transition('login <=> *', useAnimation(fadeAnimation)),
    transition('sign <=> *', useAnimation(fadeAnimation)),
]);

export const adminAnimation = trigger('adminRouteAnimations', [
    transition('* <=> *', useAnimation(fadeAnimation))
]);
