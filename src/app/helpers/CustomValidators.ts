import { FormControl, ValidationErrors } from '@angular/forms'
import { validateIdentificationNumber } from 'ciuy'
import { CNPJ, CPF } from '@julioakira/cpf-cnpj-utils'

export class CustomValidators {
    public static validateDocument(control: FormControl): ValidationErrors | null {
        if (control.value != null) {
            if (validateIdentificationNumber(control.value)) {
                return null
            } else if (CustomValidators.verifyRut(control.value)) {
                return null
            } else if (CPF.Validate(control.value)) {
                return null
            } else if (CNPJ.Validate(control.value)) {
                return null
            }
        }
        return { validateDocument: true }
    }

    private static verifyRut(rut: string): boolean {
        if (rut.length != 12) {
            return false
        }

        if (!/^([0-9])*$/.test(rut)) {
            return false
        }

        const dc = Number(rut.substr(11, 1))
        rut = rut.substr(0, 11)
        let total = 0
        let factor = 2

        for (let i = 10; i >= 0; i--) {
            total += factor * Number(rut.substr(i, 1))
            factor = factor == 9 ? 2 : ++factor
        }

        let dv = 11 - (total % 11)

        if (dv == 11) {
            dv = 0
        } else if (dv == 10) {
            dv = 1
        }

        return dv == dc
    }
}
