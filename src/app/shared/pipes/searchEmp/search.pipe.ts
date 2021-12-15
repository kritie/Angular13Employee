import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, text: any, key: any): any {
    if(!key)
     return value;
    else if (key.toLowerCase() === 'name') {
      return value.filter(
        (item: any) => {
          const name = text.split(' ');
          let firstName = false;
          let lastName = false;
          if (name.length > 1) {
            firstName = (item['firstName'].toLowerCase().indexOf(name[0].toLowerCase()) > -1);
            lastName = (item['lastName'].toLowerCase().indexOf(name[1].toLowerCase()) > -1);
          }
          firstName = (item['firstName'].toLowerCase().indexOf(text.toLowerCase()) > -1);
          lastName = (item['lastName'].toLowerCase().indexOf(text.toLowerCase()) > -1);
          return firstName || lastName;
        }
      );
    } else {
      return value.filter(
        (item: any) => {
          return item[key].toLowerCase().indexOf(text.toLowerCase()) > -1;
        }
      );
    }

    }
}
