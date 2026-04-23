import PaginationOptionsDTO from "src/shared/domain/helpers/dtos/pagination-opions.dto"
import { UserSettings } from "../entities/user-settings.entity"

export interface ICreateUserSettingsDTO {
    level: 1 | 2
    cpf?: string
    phone_number?: string
    actived: boolean
}

interface IFindAllUser {
    data: UserSettings[]
    total: number
}

export default interface UserSettingsRepository {
    create(userData: ICreateUserSettingsDTO): Promise<UserSettings>
    findById(id: string): Promise<UserSettings | null>
    findAndCount(optoins: PaginationOptionsDTO): Promise<IFindAllUser>
    save(userSettings: UserSettings): Promise<UserSettings>
}
