import 'flot/jquery.flot';
import 'flot/jquery.flot.categories';
import { Directive, Input, OnChanges, ElementRef } from '@angular/core';

@Directive({
  selector: '[appChart]'
})
export class ChartDirective implements OnChanges{
  @Input() sourceArray: {}[] = [];
  @Input() sourceProp = '';
  @Input() referenceArray: {}[] = [];
  @Input() referenceProp = '';

  data: any;

  constructor(private el: ElementRef) {  }

  ngOnChanges(changes) {
    this.refreshChart();
  }

  parseDataForCharts(sourceArray, sourceProp, referenceArray, referenceProp) {
    var data = [];
    referenceArray.forEach((r) => {
      var count = sourceArray.filter(s => {
        return s[sourceProp] == r[referenceProp];
      }).length;
      data.push([r[referenceProp], count]);
    });
    return data;
  }

  refreshChart() {
    const element = this.el.nativeElement;
    this.data = this.parseDataForCharts(
      this.sourceArray,
      this.sourceProp,
      this.referenceArray,
      this.referenceProp
    );

    if ($(element).is(':visible')) {
      $.plot(element, [ this.data ], {
        series: {
          bars: {
            show: true,
            barWidth: 0.6,
            align: "center"
          }
        },
        xaxis: {
          mode: "categories",
          tickLength: 0
        }
      });
    }
  }
}
