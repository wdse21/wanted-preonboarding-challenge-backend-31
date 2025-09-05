import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { TYPE } from '@libs/enums';

@Index('INDEX_PRODUCT_PRICE_PRODUCTID', ['productId'])
@Entity({
  name: 'product_prices',
})
export class ProductPrice {
  @PrimaryGeneratedColumn('uuid', { comment: '가격 ID' })
  id: string;

  @Column('uuid', {
    name: 'product_id',
    nullable: false,
    comment: '상품 ID (FK)',
  })
  productId: string;

  @Column('decimal', {
    name: 'base_price',
    precision: 12,
    scale: 2,
    nullable: false,
    comment: '기본 가격',
  })
  basePrice: number;

  @Column('decimal', {
    name: 'sale_price',
    precision: 12,
    scale: 2,
    nullable: true,
    comment: '할인 가격',
  })
  salePrice: number;

  @Column('decimal', {
    name: 'cost_price',
    precision: 12,
    scale: 2,
    nullable: true,
    comment: '원가 (관리용)',
  })
  costPrice: number;

  @Column('varchar', {
    name: 'currency',
    length: 3,
    default: TYPE.CurrencyType.KRW,
    comment: '통화 (기본값 KRW)',
  })
  currency: TYPE.CurrencyType;

  @Column('decimal', {
    name: 'tax_rate',
    precision: 5,
    scale: 2,
    nullable: true,
    comment: '세율',
  })
  taxRate: number;

  @OneToOne(() => Product, (product) => product.productPrice, {
    createForeignKeyConstraints: false,
    cascade: true,
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;
}
