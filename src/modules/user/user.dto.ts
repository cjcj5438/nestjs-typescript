class UserDto {
  readonly name: string;
  readonly password: string;
}

class UpdatePasswordDto {
  readonly password: string;
  readonly newPassword: string;
}

export { UserDto, UpdatePasswordDto };
