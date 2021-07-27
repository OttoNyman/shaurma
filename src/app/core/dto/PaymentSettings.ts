export interface PaymentSettings{
    cash: boolean,
    card: {
        bankName: string,
        creditCard: string,
        notes: string,
        qr: string
    } | null
}
