import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs';

function promptUser(event: VersionReadyEvent): boolean {
    return true;
}
@Injectable({ providedIn: 'root' })
export class PromptUpdateService {
    constructor(swUpdate: SwUpdate) {
        swUpdate.versionUpdates
            .pipe(
                filter(
                    (evt): evt is VersionReadyEvent =>
                        evt.type === 'VERSION_READY'
                )
            )
            .subscribe((evt) => {
                if (promptUser(evt)) {
                    document.location.reload();
                }
            });
        // ...
        const updatesAvailable = swUpdate.versionUpdates.pipe(
            filter(
                (evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'
            ),
            map((evt) => ({
                type: 'UPDATE_AVAILABLE',
                current: evt.currentVersion,
                available: evt.latestVersion,
            }))
        );
    }
}
