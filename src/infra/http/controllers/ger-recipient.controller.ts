import { BadRequestException, Controller, Get, HttpCode } from "@nestjs/common";
import { GetRecipientUseCase } from "@/domain/fastfeet/application/use-cases/get-recipient";
import { RecipientPresenter } from "../presenters/recipient-presenter";

@Controller('/recipients')
export class GetRecipientController {
  constructor(private getRecipientUseCase: GetRecipientUseCase) {}

  @Get()
  @HttpCode(200)
  async handle() {
    const result = await this.getRecipientUseCase.execute()

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const recipients = result.value.recipients

    return { recipients: recipients.map(RecipientPresenter.toHTTP) }
  }
}