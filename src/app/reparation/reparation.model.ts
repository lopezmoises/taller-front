import { Customer } from '../customer/customer.model'
import { User } from '../user/user.model'
import { Device } from '../device/device.model'

export interface Reparation {
    id?: number
    uuid?: string
    budget?: string
    problem?: string
    status: Status
    delivered?: string
    createdAt?: string
    updatedAt?: string
    customer?: Customer
    device?: Device
    receiver?: User
    clientReport?: Report[]
    techReport?: Report[]
}

export interface Report {
    id?: number
    message?: string
    type?: ReportType
    technician?: User
    date?: string
    reparation?: Reparation
}

export enum Status {
    RECIBIDO = 'RECIBIDO',
    PRESUPUESTADO = 'PRESUPUESTADO',
    SIN_ARREGLO = 'SIN_ARREGLO',
    ACEPTADO = 'ACEPTADO',
    RECHAZADO = 'RECHAZADO',
    PRONTO = 'PRONTO',
}

export enum ReportType {
    CLIENT = 'CLIENT',
    TECH = 'TECH',
}
