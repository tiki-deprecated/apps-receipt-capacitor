/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import * as TikiSdkLicensing from "@mytiki/tiki-sdk-capacitor";
import type {
  LicenseRecord,
  TikiSdk,
  TitleRecord,
  PayableRecord,
  ReceiptRecord,
} from "@mytiki/tiki-sdk-capacitor";

import type { Config } from "@/config/config";
import type { Receipt } from "@mytiki/capture-receipt-capacitor";
import type { Jwt } from "@mytiki/tiki-sdk-capacitor";

/**
 * A service class for interacting with the TIKI publish plugin.
 */
export class ServicePublish {
  readonly plugin: TikiSdk = TikiSdkLicensing.instance;
  private readonly config: Config;
  private _id?: string;
  private _license?: LicenseRecord;

  constructor(config: Config) {
    this.config = config;
  }

  /**
   * Initializes the SDK service for the specified user.
   * Do not call direct. Prefer {@link TikiService.initialize}.
   * @param id - The user's unique identifier to initialize the SDK for.
   * @returns A Promise that resolves when the initialization is complete.
   */
  async initialize(id: string): Promise<void> {
    await this.plugin.initialize(id, this.config.key.publishingId);
    this._id = id;
  }

  /**
   * Gets the user's identifier for the instance.
   * @throws Error if Tiki is not initialized. First call `.initialize()`.
   * @returns The user's identifier for the instance.
   */
  get id(): string {
    if (!this._id)
      throw Error("Tiki is not initialized. First call .initialize()");
    return this._id;
  }

  /**
   * Gets current license record associated with the instance.
   * @returns A Promise that resolves with the license record or undefined if not found.
   */
  async getLicense(): Promise<LicenseRecord | undefined> {
    if (this._license != undefined) return this._license;
    else {
      const title = await this.plugin.getTitle(this.id);
      if (title != undefined) {
        const licenses = await this.plugin.getLicenses(title.id);
        if (licenses.length > 0) this._license = licenses.slice(-1)[0];
        return this._license;
      } else {
        return undefined;
      }
    }
  }

  /**
   * Creates a new license for the SDK service using the {@link Config}.
   * @returns A Promise that resolves when the license creation is complete.
   */
  async createLicense(): Promise<void> {
    const titleRecord: TitleRecord = await this.plugin.createTitle(
      this.id,
      this.config.tags,
    );
    await this.plugin.createLicense(
      titleRecord.id,
      this.config.uses,
      this.config.terms,
      undefined,
      this.config.offer.description,
    );
  }

  /**
   * Gets an array of payable records associated with the current license.
   * @returns A Promise that resolves with an array of payable records.
   */
  async getPayables(): Promise<PayableRecord[]> {
    const license: LicenseRecord | undefined = await this.getLicense();
    return license != undefined ? this.plugin.getPayables(license.id) : [];
  }

  /**
   * Creates a new payable record for the current license.
   * @param amount - The total amount owed.
   * @param description - An optional description of the payable event.
   * @param reference - An optional reference for the payable.
   * @returns A Promise that resolves with the created payable record or undefined.
   */
  async createPayable(
    amount: number,
    description: string | undefined = this.config.offer.description,
    reference?: string,
  ): Promise<PayableRecord | undefined> {
    const license: LicenseRecord | undefined = await this.getLicense();
    if (license != undefined) {
      return this.plugin.createPayable(
        license?.id,
        amount.toString(),
        this.config.payableType,
        undefined,
        description,
        reference,
      );
    }
  }

  /**
   * Creates a new receipt record for the latest payable.
   * @param amount - The amount paid/redeemed.
   * @param description - An optional description of the payout event.
   * @returns A Promise that resolves with the created receipt record or undefined.
   */
  async createReceipt(
    amount: number,
    description?: string,
  ): Promise<ReceiptRecord | undefined> {
    const payables: PayableRecord[] = await this.getPayables();
    const latest: PayableRecord = payables.slice(-1)[0];
    if (latest != undefined) {
      return this.plugin.createReceipt(
        latest.id,
        amount.toString(),
        description,
      );
    }
  }

  async getReceipts(payables?: PayableRecord[]): Promise<ReceiptRecord[]> {
    const receipts: ReceiptRecord[] = [];
    if (!payables) payables = await this.getPayables();
    for (const payable of payables) {
      const records: ReceiptRecord[] = await this.plugin.getReceipts(
        payable.id,
      );
      receipts.push(...records);
    }
    return receipts;
  }

  async publish(receipt: Receipt): Promise<void> {
    const license = await this.getLicense();
    if (!license) throw Error("Publish requires a valid data license.");

    const jwt: Jwt = await this.plugin.token();
    const rsp = await fetch(
      "https://ingest.mytiki.com/api/latest/microblink-receipt",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt.accessToken}`,
        },
        body: JSON.stringify(receipt),
      },
    );
    if (!rsp.ok) {
      const body = await rsp.text();
      console.debug(`Unsupported receipt. Skipping. ${body}`);
    }
  }

  async balance(): Promise<number> {
    let balance: number = 0;
    const payables: PayableRecord[] = (await this.getPayables()).filter(
      (payable) => payable.type === this.config.payableType,
    );
    payables.forEach((payable) => (balance += Number(payable.amount)));
    if (payables.length > 0) {
      const receipts: ReceiptRecord[] = await this.getReceipts(payables);
      receipts.forEach((receipt) => {
        const amount: number = Number(receipt.amount);
        if (balance - amount > 0) balance -= amount;
        else balance = 0;
      });
    }
    return balance;
  }

  logout(): void {
    this._id = undefined;
    this._license = undefined;
  }
}
