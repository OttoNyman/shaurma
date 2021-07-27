import { animate, animation, group, query, style } from "@angular/animations";

export const fadeAnimation = animation([
    query(':enter', [
        style({ opacity: 0 })
    ], { optional: true }
    ),
    group([
        query(':leave', [
            animate(300, style({ opacity: 0 }))
        ],
            { optional: true }
        ),
        query(':enter', [
            style({ opacity: 0}),
            animate(300, style({ opacity: 1 }))
        ],
            { optional: true }
        )
    ])
]);
