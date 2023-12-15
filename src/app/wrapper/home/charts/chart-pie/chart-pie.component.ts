import { Component, Input, OnInit } from '@angular/core'
import { Chart, registerables } from 'chart.js'
import { ReparationService } from '../../../../reparation/reparation.service'
import { Status } from '../../../../reparation/reparation.model'

@Component({
    selector: 'app-chart-pie',
    templateUrl: './chart-pie.component.html',
    styleUrls: ['./chart-pie.component.scss'],
})
export class ChartPieComponent implements OnInit {
    @Input() labels: string[]
    @Input() values: number[]

    constructor(private reparationService: ReparationService) {
        Chart.register(...registerables)
    }

    public ngOnInit(): void {
        const myChart = new Chart('myChart', {
            type: 'doughnut',
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: '',
                        data: this.values,
                        backgroundColor: this.labels.map(label => this.statusColor(label)),
                        borderWidth: 1,
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

    public statusColor(status: string): string {
        switch (status) {
            case Status.RECIBIDO:
                return '#20c997'
            case Status.PRESUPUESTADO:
                return '#0dcaf0'
            case Status.ACEPTADO:
                return '#0d6efd'
            case Status.PRONTO:
                return '#198754'
            case Status.RECHAZADO:
                return '#dc3545'
            default:
                return '#6c757d'
        }
    }
}
