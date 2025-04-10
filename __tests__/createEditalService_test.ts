import EditalService from "@/domain/services/editalService";
import RepositoryFactory from "@/domain/factories/RepositoryFactory";
import Edital from "@/domain/entities/edital";
import Deadline from "@/domain/value-objects/deadline";

const sponsor = {
  id: 2,
  name: "Sponsor B",
  icon_url: "https://sponsorb.com/icon.png",
  description: "Descrição B",
  website: "https://sponsorb.com",
  contactEmail: "contato@sponsorb.com",
  phone: "987654321",
};

const sdgs = [{ id: 4, name: "ODS 4", code: "4" }];
const causes = [{ id: 5, name: "Saúde" }];
const skills = [{ id: 6, name: "Gestão" }];

jest.mock("@/domain/factories/RepositoryFactory", () => ({
  __esModule: true,
  default: {
    getEditalRepository: jest.fn(),
  },
}));

describe("EditalService.create", () => {
  it("deve criar um novo edital e chamar o repositório com os dados corretos", async () => {
    const start = new Date("2025-03-01");
    const end = new Date("2025-04-01");
    const deadline = new Deadline(start, end);

    const newEdital = new Edital(
      null,
      "Novo Edital",
      "https://icone.com/novo.png",
      "Descrição do novo edital",
      2000,
      10000,
      sponsor,
      sdgs,
      causes,
      skills,
      "https://link-do-novo-edital.com",
      deadline
    );

    const fakeRepository = {
      save: jest.fn().mockResolvedValue({
        ...newEdital,
        id: 2, 
      }),
    };

    (RepositoryFactory.getEditalRepository as jest.Mock).mockReturnValue(fakeRepository);

    const result = await EditalService.create({
      title: "Novo Edital",
      icon: "https://icone.com/novo.png",
      description: "Descrição do novo edital",
      funding_min: 2000,
      funding_max: 10000,
      sponsor,
      sdgs,
      causes,
      skills,
      edital_url: "https://link-do-novo-edital.com",
      start_of_submission: start.toISOString(),
      end_of_submission: end.toISOString(),
    });

    expect(fakeRepository.save).toHaveBeenCalledWith(expect.any(Edital));
    expect(result.id).toBe(2);
    expect(result.deadline instanceof Deadline).toBe(true);
    expect(result.deadline.initial_time).toEqual(start);
    expect(result.deadline.end_time).toEqual(end);
  });
});
