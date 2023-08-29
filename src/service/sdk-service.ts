/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import type {
  Jwt,
  PayableRecord,
  ReceiptRecord,
  TikiSdk,
} from "@mytiki/tiki-sdk-capacitor";
import * as TikiSdkLicensing from "@mytiki/tiki-sdk-capacitor";
import type { TikiService } from "@/service/tiki-service";
import type { Program } from "@/service/config";
import type { TitleRecord } from "@mytiki/tiki-sdk-capacitor";
import type { LicenseRecord } from "@mytiki/tiki-sdk-capacitor";
import type { Receipt } from "@mytiki/tiki-capture-receipt-capacitor";

/**
 * A service class for interacting with the Tiki SDK plugin.
 */
export class SdkService {
  /**
   * The type for all payables: pt (aka reward points).
   */
  static readonly PAYABLE_TYPE = "pt";
  /**
   * The raw plugin instance. Use to call TikiSdk directly.
   */
  readonly plugin: TikiSdk = TikiSdkLicensing.instance;

  private readonly tiki: TikiService;
  private _license?: LicenseRecord;
  private _id?: string;

  /**
   * Creates an instance of the SdkService class.
   * Do not construct directly. Call from {@link TikiService}.
   * @param tiki - The parent service instance.
   */
  constructor(tiki: TikiService) {
    this.tiki = tiki;
  }

  /**
   * Gets the user's identifier for the instance.
   * @throws Error if Tiki is not initialized. First call `.initialize()`.
   * @returns The user's identifier for the instance.
   */
  get id(): string {
    if (this._id != undefined) return this._id;
    else throw Error("Tiki is not initialized. First call .initialize()");
  }

  /**
   * Initializes the SDK service for the specified user.
   * Do not call direct. Prefer {@link TikiService.initialize}.
   * @param id - The user's unique identifier to initialize the SDK for.
   * @returns A Promise that resolves when the initialization is complete.
   */
  async initialize(id: string): Promise<void> {
    await this.plugin.initialize(id, this.tiki.config.key.publishingId);
    this._id = id;
  }

  /**
   * Creates a new license for the SDK service using the program {@link Config}.
   * @returns A Promise that resolves when the license creation is complete.
   */
  async createLicense(): Promise<void> {
    const program: Program = this.tiki.config.program;
    const titleRecord: TitleRecord = await this.plugin.createTitle(
      this.id,
      program.tags ?? [],
    );
    const rsp = await this.plugin.createLicense(
      titleRecord.id,
      [
        {
          usecases: program.usecases,
          destinations: program.destinations,
        },
      ],
      program.terms,
      undefined,
      program.description,
    );
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
        if (licenses.length > 0)
          this._license = licenses.at(licenses.length - 1);
        return this._license;
      } else {
        return undefined;
      }
    }
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
   * @param description - A description of the payable event.
   * @param reference - An optional reference for the payable.
   * @returns A Promise that resolves with the created payable record or undefined.
   */
  async createPayable(
    amount: number,
    description: string,
    reference?: string,
  ): Promise<PayableRecord | undefined> {
    const license: LicenseRecord | undefined = await this.getLicense();
    if (license != undefined) {
      return this.plugin.createPayable(
        license?.id,
        amount.toString(),
        SdkService.PAYABLE_TYPE,
        undefined,
        description,
        reference,
      );
    }
  }

  /**
   * Creates a new receipt record for the latest payable.
   * @param amount - The amount paid/redeemed.
   * @param description - A description of the payout event.
   * @returns A Promise that resolves with the created receipt record or undefined.
   */
  async createReceipt(
    amount: number,
    description: string,
  ): Promise<ReceiptRecord | undefined> {
    const payables: PayableRecord[] = await this.getPayables();
    const latest = payables.at(-1);
    if (latest != undefined) {
      return this.plugin.createReceipt(
        latest.id,
        amount.toString(),
        description,
      );
    }
  }

  /**
   * ingest the receipt to microblink to process it
   * @param receipt - the receipt that will be scanned
   */
  async ingest(receipt: Receipt): Promise<void> {
    const jwt: Jwt = await this.plugin.token();
    const rsp = await fetch(
      "https://ingest.mytiki.com/api/latest/microblink-receipt",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt.accessToken}`,
        },
        body: JSON.stringify(receipt), //TODO FIX THIS.
      },
    );
    if (!rsp.ok) {
      const body = await rsp.text();
      throw Error(`Receipt ingestion failed: ${body}`);
    }
  }
}
