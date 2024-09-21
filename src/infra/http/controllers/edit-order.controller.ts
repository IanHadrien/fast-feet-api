import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { BadRequestException, Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { EditOrderUseCase } from "@/domain/fastfeet/application/use-cases/edit-order";

const editOrderBodySchema = z.object({
  status: z.string(),
  userId: z.string().uuid(),
  recipientId: z.string().uuid(),
})

const bodyValidationPipe = new ZodValidationPipe(editOrderBodySchema)

type EditOrderBodySchema = z.infer<typeof editOrderBodySchema>

@Controller('/orders/:id')
export class EditOrderController {
  constructor(private editOrderUseCase: EditOrderUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditOrderBodySchema,
    @Param('id') orderId: string,
  ) {
    const { status, recipientId, userId } = body

    const result = await this.editOrderUseCase.execute({
      id: orderId,
      status,
      recipientId,
      userId,
    })

    if (result.isRight()) {
      return { message: "Encomenda atualizado com sucesso" };
    }

    throw new BadRequestException("Falha ao atualizar o Encomenda");
  }
}