import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { BadRequestException, Body, Controller, HttpCode, Param, Post, Put } from "@nestjs/common";
import { CreateUserUseCase } from "src/domain/fastfeet/application/use-cases/create-user";
import { EditUserUseCase } from "@/domain/fastfeet/application/use-cases/edit-user";

const editUserBodySchema = z.object({
  name: z.string(),
  cpf: z.string(),
  password: z.string(),
  currentLocation: z.string().optional(),
  role: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editUserBodySchema)

type EditUserBodySchema = z.infer<typeof editUserBodySchema>

@Controller('/users/:id')
export class EditUserController {
  constructor(private editUserUseCase: EditUserUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditUserBodySchema,
    @Param('id') userId: string,
  ) {
    const { cpf, currentLocation, name, password, role } = body

    const result = await this.editUserUseCase.execute({
      id: userId,
      cpf,
      currentLocation,
      name,
      password,
      role,
    })

    if (result.isRight()) {
      return { message: "Cadastro atualizado com sucesso" };
    }

    throw new BadRequestException("Falha ao cadastrar o usuário");
  }
}