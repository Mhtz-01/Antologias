import Deadline from "@/domain/value-objects/deadline";

describe("Deadline", () => {
  const start = new Date("2025-01-01");
  const end = new Date("2025-02-01");

  it("deve criar um deadline válido", () => {
    const deadline = new Deadline(start, end);
    expect(deadline.initial_time).toEqual(start);
    expect(deadline.end_time).toEqual(end);
  });

  it("deve lançar erro se data final for antes da inicial", () => {
    expect(() => {
      new Deadline(new Date("2025-02-01"), new Date("2025-01-01"));
    }).toThrow("Data final não pode ser antes da inicial");
  });

  it("deve formatar as datas corretamente", () => {
    const deadline = new Deadline(start, end);
    const formatted = deadline.formatEditalDeadline("pt-BR");
    expect(formatted).toContain("De");
    expect(formatted).toContain("até");
  });

  it("deve verificar se uma data está dentro do prazo", () => {
    const deadline = new Deadline(start, end);
    const dentro = new Date("2025-01-15");
    const fora = new Date("2025-03-01");

    expect(deadline.isWithinDeadline(dentro)).toBe(true);
    expect(deadline.isWithinDeadline(fora)).toBe(false);
  });

  it("deve identificar se o prazo já expirou", () => {
    const deadline = new Deadline(start, end);
    const depois = new Date("2025-03-01");
    expect(deadline.isExpired(depois)).toBe(true);
  });

  it("deve calcular corretamente os dias restantes", () => {
    const hoje = new Date("2025-01-15");
    const deadline = new Deadline(start, end);

    expect(deadline.daysUntilDeadline(hoje)).toBe(17);
  });

  it("deve retornar 0 dias restantes se já expirou", () => {
    const depois = new Date("2025-03-01");
    const deadline = new Deadline(start, end);
    expect(deadline.daysUntilDeadline(depois)).toBe(0);
  });
});
