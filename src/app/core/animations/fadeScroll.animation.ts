import { animate, animation, group, query, style } from "@angular/animations";

export const fadeScrollAnimation = animation([
    style({position: 'relative', top: 0, right: 0}),
    query(':enter', [
        style({ opacity: 0, right: '{{showOffset}}' })
    ], { optional: true }
    ),
    group([
        query(':leave', [
            animate(200, style({ opacity: 0, right: '{{hideOffset}}' }))
        ],
            { optional: true }
        ),
        query(':enter', [
            style({ opacity: 0, right: '{{showOffset}}' }),
            animate('200ms 100ms', style({ opacity: 1, right: '0' }))
        ],
            { optional: true }
        )
    ])
]);
