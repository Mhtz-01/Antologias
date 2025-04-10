/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginModal from "@/components/loginmodal";
import { useAuth } from "@/domain/context/authContext";
import User from "@/domain/entities/user";
import NGO from "@/domain/entities/ngo";

const onCloseMock = jest.fn();

const loginMock = jest.fn();
const logoutMock = jest.fn();

// Usuário e ONG fake
const fakeNGO = new NGO(
  1,
  "ONG Teste",
  "Descrição da ONG",
  true,
  2010,
  "11999999999",
  "https://instagram.com/ong",
  "https://x.com/ong",
  "https://facebook.com/ong",
  "https://pix.com/qrcode",
  [],
  [],
  [],
  []
);

const fakeUser = new User("Maria", "maria@teste.com", fakeNGO);

jest.mock("@/domain/context/authContext", () => {
  return {
    __esModule: true,
    useAuth: jest.fn(),
  };
});

describe("LoginModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      login: loginMock,
      logout: logoutMock,
    });
  });

  it("deve renderizar campos de email e senha", () => {
    render(<LoginModal onClose={onCloseMock} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("deve permitir login com dados válidos", async () => {
    render(<LoginModal onClose={onCloseMock} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "maria@teste.com" },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: "123456" },
    });

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        name: fakeUser.name,
        email: fakeUser.email,
        ngo: fakeNGO,
      }),
    });

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalled();
      expect(onCloseMock).toHaveBeenCalled();
    });

    const userSaved = JSON.parse(localStorage.getItem("user")!);
    expect(userSaved.name).toBe("Maria");
  });

  it("deve mostrar erro em caso de falha no login", async () => {
    render(<LoginModal onclose={onCloseMock}/>);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "maria@teste.com" },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: "errado" },
    });

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
    });

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/falha ao fazer login/i)).toBeInTheDocument();
      expect(loginMock).not.toHaveBeenCalled();
    });
  });
});
