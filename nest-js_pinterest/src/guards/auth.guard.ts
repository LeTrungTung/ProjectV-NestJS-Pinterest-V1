import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    //logic
    const request = context.switchToHttp().getRequest();
    //lấy được request làm tương tự thằng express
    //bước 1: lấy header

    //bước 2: kiểm tra xem có header hay không

    //bước 3: Kiểm tra xem header 'Authorization' có chứa từ khóa 'Bearer' không

    //bước 4: Nếu không có token => trả về mã 401

    //BƯỚC 5: Giải mã token và kiểm tra tính hợp lệ

    //bước 6: gán

    return true; //true hoặc false
  }
}
