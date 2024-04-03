import { RedemptionDTO } from "./RedemptionDTO";

enum RedemptionStatus {
  Submitted = 0,
  Pending = 1
}

enum PaymentStatus {
  Pending = 0,
  Completed = 1
}

enum RedeemableFundsStatus {
  Pending = 0,
  Reserved = 1
}

export interface RedemptionInterface {
  redemptionIntentId: number;
  createdAt: Date;
  sweeps: number;
  amount: number;
  redemptionStatus: RedemptionStatus;
  redeemableFundsStatus: RedeemableFundsStatus;
  paymentStatus: PaymentStatus;
}

export class Redemption implements RedemptionInterface {
  redemptionIntentId: number
  createdAt: Date
  sweeps: number
  amount: number
  redemptionStatus: RedemptionStatus
  redeemableFundsStatus: RedeemableFundsStatus
  paymentStatus: PaymentStatus

  constructor(dto: RedemptionDTO) {
    this.redemptionIntentId = dto.redemptionIntentId
    let date = Date.parse(dto.createdAt);
    let date2 = new Date(date);
    this.createdAt = date2
    this.sweeps = dto.amount
    this.amount = dto.amount
    this.redemptionStatus = dto.redemptionStatus === 0 ? RedemptionStatus.Submitted : RedemptionStatus.Pending
    this.paymentStatus = dto.paymentStatus === 0 ? PaymentStatus.Pending : PaymentStatus.Completed
    this.redeemableFundsStatus = dto.redeemableFundsStatus === 0 ? RedeemableFundsStatus.Pending : RedeemableFundsStatus.Reserved
  }

  public dateString(): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
    };
    
    const formattedDate = this.createdAt.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  public redemptionStatusString(): string {
    return this.redemptionStatus === RedemptionStatus.Submitted ? "Submitted" : "Pending"
  }

  public paymentStatusString(): string {
    return this.paymentStatus === PaymentStatus.Pending ? "Pending" : "Completed"
  }

  public redeemableFundsStatusString(): string {
    return this.redeemableFundsStatus === RedeemableFundsStatus.Pending ? "FUNDS_PENDING" : "FUNDS_RESERVED"
  }
}