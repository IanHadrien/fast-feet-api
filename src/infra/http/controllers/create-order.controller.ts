import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { BadRequestException, Body, Controller, HttpCode, Post } from "@nestjs/common";
import { CreateOrderUseCase } from "@/domain/fastfeet/application/use-cases/create-order";

const createOrderBodySchema = z.object({
  status: z.string(),
  userId: z.string().uuid(),
  recipientId: z.string().uuid(),
})

const bodyValidationPipe = new ZodValidationPipe(createOrderBodySchema)

type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>

@Controller('/orders')
export class CreateOrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateOrderBodySchema,
  ) {
    const { status, recipientId, userId } = body

    const result = await this.createOrderUseCase.create({
      status,
      recipientId,
      userId,
    })

    if (result.isRight()) {
      return { message: "Cadastro realizado com sucesso" };
    }

    throw new BadRequestException("Falha ao cadastrar a encomenda");
  }
}