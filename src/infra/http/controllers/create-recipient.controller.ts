import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { BadRequestException, Body, Controller, HttpCode, Post } from "@nestjs/common";
import { CreateRecipientUseCase } from "@/domain/fastfeet/application/use-cases/create-recipient";

const createRecipientBodySchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createRecipientBodySchema)

type CreateRecipientBodySchema = z.infer<typeof createRecipientBodySchema>

@Controller('/recipients')
export class CreateRecipientController {
  constructor(private createRecipientUseCase: CreateRecipientUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateRecipientBodySchema,
  ) {
    const { name, address, email, phone } = body

    const result = await this.createRecipientUseCase.create({
      name,
      address,
      email,
      phone,
    })

    if (result.isRight()) {
      return { message: "Cadastro realizado com sucesso" };
    }

    throw new BadRequestException("Falha ao cadastrar o Destinatário");
  }
}