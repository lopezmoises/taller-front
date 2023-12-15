import { Component, Input, OnInit } from '@angular/core'
import { ReparationService } from '../../../../reparation/reparation.service'
import { Chart, registerables } from 'chart.js'

@Component({
    selector: 'app-chart-bar',
    templateUrl: './chart-bar.component.html',
    styleUrls: ['./chart-bar.component.scss'],
})
export class ChartBarComponent implements OnInit {
    @Input() labels: string[]
    @Input() values: number[]
    constructor(private reparationService: ReparationService) {
        Chart.register(...registerables)
    }

    public ngOnInit(): void {
        const myChart2 = new Chart('myChart2', {
            type: 'bar',
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: 'Reparaciones terminadas por día',
                        data: this.values,
                        borderWidth: 1,
                        backgroundColor: '#ffc107'
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        })
    }
}
