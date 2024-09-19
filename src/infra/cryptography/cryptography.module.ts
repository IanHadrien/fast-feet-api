import { Module } from "@nestjs/common";
import { HashGenerator } from "../../domain/fastfeet/application/cryptography/hash-generator";
import { BcryptHasher } from "./bcrypt-hasher";
import { HashComparer } from "@/domain/fastfeet/application/cryptography/hash-comparer";
// import { Encrypter } from "@/domain/fastfeet/application/cryptography/encrypter";

@Module({
  providers: [
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [HashComparer, HashGenerator]
})
export class CryptographyModule {}