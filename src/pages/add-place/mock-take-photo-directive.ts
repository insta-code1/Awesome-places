import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'cameraPhoto',
})
export class SafeImagePipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) {}

    transform(image) {
        if (image !== '') {
            return this.sanitizer.bypassSecurityTrustHtml(image);
        }
        return;
    }
}
