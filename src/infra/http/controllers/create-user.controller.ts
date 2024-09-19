import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { BadRequestException, Body, Controller, HttpCode, Post } from "@nestjs/common";
import { CreateUserUseCase } from "src/domain/fastfeet/application/use-cases/create-user";

const createUserBodySchema = z.object({
  name: z.string(),
  cpf: z.string(),
  password: z.string(),
  currentLocation: z.string().optional(),
  role: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createUserBodySchema)

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

@Controller('/users')
export class CreateUserController {
  constructor(private createUser: CreateUserUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateUserBodySchema,
  ) {
    const { cpf, currentLocation, name, password, role } = body

    const result = await this.createUser.create({
      cpf,
      currentLocation,
      name,
      password,
      role,
    })

    if (result.isRight()) {
      return { message: "Cadastro realizado com sucesso" };
    }

    throw new BadRequestException("Falha ao cadastrar o usuário");
  }
}