import EditalService from "@/domain/services/editalService";
import RepositoryFactory from "@/domain/factories/RepositoryFactory";
import Edital from "@/domain/entities/edital";
import Deadline from "@/domain/value-objects/deadline";

const deadline = new Deadline(
  new Date("2025-01-01T00:00:00.000Z"),
  new Date("2025-02-01T00:00:00.000Z")
);

const mockEditais: Edital[] = [
  new Edital(
    1,
    "Edital Teste",
    "https://icone.com/teste.png",
    "Descrição do edital",
    1000,
    5000,
    {
      id: 1,
      name: "Sponsor A",
      icon_url: "https://sponsor.com/icon.png",
      description: "Descrição do sponsor",
      website: "https://sponsor.com",
      contactEmail: "contato@sponsor.com",
      phone: "123456789",
    },
    [{ id: 1, name: "ODS 1", code: "1" }],
    [{ id: 2, name: "Educação" }],
    [{ id: 3, name: "Artes" }],
    "https://link-do-edital.com",
    deadline
  ),
];

jest.mock("@/domain/factories/RepositoryFactory", () => ({
  __esModule: true,
  default: {
    getEditalRepository: jest.fn(),
  },
}));

describe("EditalService.getEditais", () => {
  it("deve retornar uma lista de editais", async () => {
    const fakeRepository = {
      findAll: jest.fn().mockResolvedValue(mockEditais),
    };

    (RepositoryFactory.getEditalRepository as jest.Mock).mockReturnValue(fakeRepository);

    const result = await EditalService.getEditais();

    expect(fakeRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockEditais);
  });
});
