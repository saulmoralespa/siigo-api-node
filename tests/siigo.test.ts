import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { Siigo } from "../src/index";
import { Client, Product, Invoice } from "../src/types";

// Mock axios
vi.mock("axios");
const mockedAxios = axios as unknown as { create: typeof axios.create };

describe("Siigo SDK (unit, mocked)", () => {
  let siigo: Siigo;

  beforeEach(() => {
    siigo = new Siigo({ username: "user", access_key: "key" });
    // Mock axios.create to return axios itself (so .request can be spied on)
    mockedAxios.create = vi.fn(() => axios);
  });

  it("should fetch a token", async () => {
    vi.spyOn(axios, "request").mockResolvedValueOnce({
      data: {
        access_token: "token",
        expires_in: 3600,
        token_type: "Bearer",
        scope: "scope",
      },
    });
    // Mock fs.readFile to return the token
    vi.stubGlobal("fs", {
      readFile: vi.fn().mockResolvedValue(
        JSON.stringify({
          access_token: "token",
          expires_in: 3600,
          token_type: "Bearer",
          scope: "scope",
        })
      ),
      access: vi.fn().mockResolvedValue(undefined),
    });
    const token = await siigo.getToken();
    expect(token).toHaveProperty("access_token");
  });

  it("should create a product", async () => {
    const mockProduct = { name: "Test", code: "P1" } as Product;
    vi.spyOn(axios, "request").mockResolvedValueOnce({
      data: { id: "1", name: "Test" },
    });
    const result = await siigo.createProduct(mockProduct);
    expect(result).toHaveProperty("id", "1");
    expect(result).toHaveProperty("name", "Test");
  });

  it("should get clients", async () => {
    vi.spyOn(axios, "request").mockResolvedValueOnce({
      data: { results: [{ id: "c1" }] },
    });
    const result = await siigo.getClients();
    expect(result).toHaveProperty("results");
    expect(result.results[0]).toHaveProperty("id", "c1");
  });

  it("should create a client", async () => {
    const mockClient = {
      name: ["Test Client"],
      identification: "123",
      type: "Customer",
      person_type: "Person",
      id_type: "31",
      commercial_name: "Test",
      branch_office: 0,
      active: true,
      vat_responsible: false,
      fiscal_responsibilities: [],
      address: {
        address: "address",
        city: { country_code: "CO", state_code: "11", city_code: "11001" },
        postal_code: "11001",
      },
      phones: [],
      contacts: [],
      comments: "",
    } as Client;
    vi.spyOn(axios, "request").mockResolvedValueOnce({
      data: { id: "c1", name: ["Test Client"] },
    });
    const result = await siigo.createClient(mockClient);
    expect(result).toHaveProperty("id", "c1");
    expect(result).toHaveProperty("name");
  });

  it("should create an invoice", async () => {
    const today = new Intl.DateTimeFormat("es-CO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .format(new Date())
      .split("/")
      .reverse()
      .join("-");

    const mockInvoice = {
      document: { id: 1 },
      date: today,
      customer: { identification: "id", branch_office: 0 },
      seller: 1,
      stamp: { send: false },
      mail: { send: false },
      items: [],
      payments: [],
    } as Invoice;
    vi.spyOn(axios, "request").mockResolvedValueOnce({
      data: { id: "inv1", number: 123 },
    });
    const result = await siigo.createInvoice(mockInvoice);
    expect(result).toHaveProperty("id", "inv1");
    expect(result).toHaveProperty("number", 123);
  });
});
