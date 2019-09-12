import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class DemoPipe implements PipeTransform {
  /**
   * 管道可以用在参数上面
   * @param value 获取要处理的。值
   * @param metadata  打印出来看
   */
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value:', value); // 就是那个user的值
    console.log('metadata', metadata);
    return value;
  }
}
