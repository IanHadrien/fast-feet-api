import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { BadRequestException, Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { EditRecipientUseCase } from "@/domain/fastfeet/application/use-cases/edit-recipient";

const editRecipientBodySchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editRecipientBodySchema)

type EditRecipientBodySchema = z.infer<typeof editRecipientBodySchema>

@Controller('/recipients/:id')
export class EditRecipientController {
  constructor(private editRecipientUseCase: EditRecipientUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditRecipientBodySchema,
    @Param('id') recipientId: string,
  ) {
    const { address, email, name, phone } = body

    const result = await this.editRecipientUseCase.execute({
      id: recipientId,
      email,
      phone,
      name,
      address,
    })

    if (result.isRight()) {
      return { message: "Destinatário atualizado com sucesso" };
    }

    throw new BadRequestException("Falha ao atualizar o destinatário");
  }
}