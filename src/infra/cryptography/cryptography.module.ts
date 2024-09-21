import { Module } from "@nestjs/common";
import { HashGenerator } from "../../domain/fastfeet/application/cryptography/hash-generator";
import { BcryptHasher } from "./bcrypt-hasher";
import { HashComparer } from "@/domain/fastfeet/application/cryptography/hash-comparer";
import { Encrypter } from "@/domain/fastfeet/application/cryptography/encrypter";
import { JwtEncripter } from "./jwt-encrypter";

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncripter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashComparer, HashGenerator]
})
export class CryptographyModule {}