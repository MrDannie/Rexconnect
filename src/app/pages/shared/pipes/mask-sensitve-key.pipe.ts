import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskSensitiveKeys',
})
export class MaskSensitiveKeys implements PipeTransform {
  transform(unmaskedString: any, numberOfCharacterToNotMask: any = 2): any {
    console.log('LOVE', unmaskedString, numberOfCharacterToNotMask);

    // var cardnumber = '4567 6365 7987 3783';
    var firstSubstring = unmaskedString.substring(
      0,
      numberOfCharacterToNotMask
    );
    var secondSubstring = unmaskedString.substring(
      unmaskedString.length - numberOfCharacterToNotMask
    );
    let maskedPortion = unmaskedString
      .substring(
        numberOfCharacterToNotMask,
        unmaskedString.length - numberOfCharacterToNotMask
      )
      .replace(/[a-zA-Z0-9&_\.-]/g, '*');
    console.log(
      'Result from Substring',

      maskedPortion
    );

    return firstSubstring + maskedPortion + secondSubstring;
  }
}
