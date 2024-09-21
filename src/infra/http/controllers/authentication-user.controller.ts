import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { BadRequestException, Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { AuthenticationUserUseCase } from "@/domain/fastfeet/application/use-cases/authentication-user";
import { WrongCredentialsError } from "@/domain/fastfeet/application/use-cases/errors/wrong-credentials-error";
import { Public } from "@/infra/auth/public";

const authenticationUserBodySchema = z.object({
  cpf: z.string(),
  password: z.string(),
})

type AuthenticationUserBodySchema = z.infer<typeof authenticationUserBodySchema>

@Controller('/sessions')
@Public()
export class AuthenticationUserController {
  constructor(private authenticationUserUseCase: AuthenticationUserUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticationUserBodySchema))
  async handle(@Body() body: AuthenticationUserBodySchema) {
    const { cpf, password } = body

    const result = await this.authenticationUserUseCase.execute({
      cpf,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default: 
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken
    }
  }
}