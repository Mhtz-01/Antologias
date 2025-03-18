import request from "supertest";
import { createMocks } from "node-mocks-http";
import { GET } from "@/app/api/editais/route";
import RepositoryFactory from "@/domain/factories/RepositoryFactory";

// Mock do repositório
const mockFindAll = jest.fn();

jest.mock("@/domain/factories/RepositoryFactory", () => ({
  getEditalRepository: () => ({
    findAll: mockFindAll,
  }),
}));

describe("GET /api/editais", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar uma lista de editais", async () => {
    const fakeEditais = [
      { id: 1, titulo: "Edital 1" },
      { id: 2, titulo: "Edital 2" },
    ];
    
    mockFindAll.mockResolvedValue(fakeEditais);

    const { req, res } = createMocks({ method: "GET" });
    await GET(req as any);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(fakeEditais);
  });

  it("deve retornar um erro 500 caso ocorra uma falha", async () => {
    mockFindAll.mockRejectedValue(new Error("Falha ao buscar editais"));

    const { req, res } = createMocks({ method: "GET" });
    await GET(req as any);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      error: "Erro ao buscar editais: Falha ao buscar editais",
    });
  });
});
