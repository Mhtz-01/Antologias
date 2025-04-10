import EditalService from "@/domain/services/editalService";
import RepositoryFactory from "@/domain/factories/RepositoryFactory";
import { Sponsor } from "@/domain/entities/sponsor";
import Deadline from "@/domain/value-objects/deadline";
import Edital from "@/domain/entities/edital";

jest.mock("@/domain/factories/RepositoryFactory");

const mockEditalRepository = {
  save: jest.fn(),
  findAll: jest.fn(),
  findByID: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
};

(RepositoryFactory.getEditalRepository as jest.Mock).mockReturnValue(mockEditalRepository);

const fakeSponsor = new Sponsor(1, "Sponsor Test", "img.jpg", "desc", "site", "email", "425325632");
const fakeDeadline = new Deadline(new Date("2025-03-10"), new Date("2025-05-20"));

const editalData = {
    title: "Novo Edital",
    icon: "edital-icon.png",
    description: "Descrição do edital",
    funding_min: 1000,
    funding_max: 5000,
    sponsor: fakeSponsor,
    sdgs: [{ id: 4, name: "ODS 4", code: "4" }],
    causes: [{ id: 5, name: "Saúde" }],
    skills: [{ id: 6, name: "Gestão" }],
    edital_url: "http://edital.com",
    deadline: fakeDeadline
};

describe("EditalService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update an existing edital", async () => {
    const updatedEdital = new Edital(
        1,
        editalData.title,
        editalData.icon,
        editalData.description,
        editalData.funding_min,
        editalData.funding_max,
        editalData.sponsor,
        editalData.sdgs,
        editalData.causes,
        editalData.skills,
        editalData.edital_url,
        editalData.deadline
    );

    mockEditalRepository.update.mockResolvedValue(updatedEdital);

    const result = await EditalService.update({ id: 1, ...editalData });

    expect(mockEditalRepository.update).toHaveBeenCalledWith(1, expect.any(Edital));
    expect(result).toEqual(updatedEdital);
  });

  it("should delete an edital by ID", async () => {
    mockEditalRepository.delete.mockResolvedValue(undefined);

    await EditalService.delete(1);

    expect(mockEditalRepository.delete).toHaveBeenCalledWith(1);
  });
});
