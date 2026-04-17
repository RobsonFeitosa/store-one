interface IPaymentsConfig {
  isDisarm: boolean
  VALUE_DEFAULT: number
  pagarmeApiKey: string
  pagarmeEncryptionKey: string
}

export default {
  isDisarm: false,
  VALUE_DEFAULT: 15,
  pagarmeApiKey: process.env.NEXT_PUBLIC_PAGARME_API_KEY,
  pagarmeEncryptionKey: process.env.NEXT_PUBLIC_PAGARME_ENCRYPTION_KEY,
} as IPaymentsConfig
