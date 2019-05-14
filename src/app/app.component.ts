import { Component, OnInit } from '@angular/core';
import * as tinycolor from 'tinycolor2';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

interface CssVariable {
  name: string;
  rgb: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private static prefixPrimary = '--palette-primary-';
  private static prefixAccent = '--palette-accent-';

  title = 'material-css-vars';

  style: SafeStyle;

  private stylePrimary: CssVariable[];
  private styleAccent: CssVariable[];

  primary = '#3f51b5';
  accent = '#ff4081';

  colorMapper = [
    {name: '50',   map: [ 52, 0,  0  ]},
    {name: '100',  map: [ 37, 0,  0  ]},
    {name: '200',  map: [ 26, 0,  0  ]},
    {name: '300',  map: [ 12, 0,  0  ]},
    {name: '400',  map: [ 6,  0,  0  ]},
    {name: '500',  map: [ 0,  0,  0  ]},
    {name: '600',  map: [ 0,  6,  0  ]},
    {name: '700',  map: [ 0,  12, 0  ]},
    {name: '800',  map: [ 0,  18, 0  ]},
    {name: '900',  map: [ 0,  24, 0  ]},
    {name: 'A100', map: [ 50, 0,  30 ]},
    {name: 'A200', map: [ 30, 0,  30 ]},
    {name: 'A400', map: [ 10, 0,  15 ]},
    {name: 'A700', map: [ 5,  0,  5  ]},
  ];

constructor(
  private sanitizer: DomSanitizer
) {}

  ngOnInit(): void {
    this.stylePrimary = this.computeColors(AppComponent.prefixPrimary, this.primary);
    this.styleAccent = this.computeColors(AppComponent.prefixAccent, this.accent);
    this.setStyle();
  }

  setStyle() {
    this.style = this.sanitizer.bypassSecurityTrustStyle(
      this.toStyleString([...this.stylePrimary, ...this.styleAccent])
    );
  }

  computeColors(prefix: string, hex: string): CssVariable[] {
    return this.colorMapper.map(item => {
      return this.getColorObject(prefix, item.name,
        tinycolor(hex).lighten(item.map[0]).darken(item.map[1]).saturate(item.map[2])
      );
    });
  }

  getColorObject(prefix: string, name: string, value: tinycolor.Instance): CssVariable {
    const c = tinycolor(value).toRgb();
    return {
      name: `${prefix}${name}`,
      rgb: `${c.r}, ${c.g}, ${c.b}`
    };
  }

  toStyleString(variables: CssVariable[]) {
    let result = '';
    variables.forEach(v => result += `${v.name}: ${v.rgb}; `);
    return result;
  }

  onPrimaryChange(hex: string) {
      this.primary = hex;
      this.stylePrimary = this.computeColors(AppComponent.prefixPrimary, this.primary);
      this.setStyle();
  }
  onAccentChange(hex: string) {
    this.accent = hex;
    this.styleAccent = this.computeColors(AppComponent.prefixAccent, this.accent);
    this.setStyle();
  }

}
